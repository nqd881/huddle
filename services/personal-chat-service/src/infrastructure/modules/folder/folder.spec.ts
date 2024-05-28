import { INestApplication } from "@nestjs/common";
import { SequelizeModule } from "@nestjs/sequelize";
import { Test, TestingModule } from "@nestjs/testing";
import { ClsModule, ClsService } from "nestjs-cls";
import { IMemoryDb, newDb } from "pg-mem";
import request from "supertest";
import { CommandBusModule } from "../command-bus/command-bus.module";
import { EventBusModule } from "../event-bus/event-bus.module";
import { FolderModule } from "./folder.module";
import { FolderRepo } from "./folder-repo/folder-repo";
import {
  AppCommandBase,
  IAppCommandBase,
} from "../../../application/base/app-command.base";
import { v4 } from "uuid";

describe("Folder Test", function () {
  type MyClsStore = { userId: string };

  let testModule: TestingModule;
  let db: IMemoryDb;
  let clsService: ClsService<MyClsStore>;
  let app: INestApplication;
  let folderRepo: FolderRepo;
  let userId: string;

  beforeAll(async () => {
    userId = v4();

    db = newDb();

    testModule = await Test.createTestingModule({
      imports: [
        CommandBusModule.forRootAsync({
          useFactory: (clsService: ClsService<MyClsStore>) => {
            return {
              hooks: {
                beforeExecute: (command: AppCommandBase) => {
                  command.setMetadata({ userId: clsService.get("userId") });
                },
              },
            };
          },
          inject: [ClsService],
          global: true,
        }),
        EventBusModule.forRoot({ global: true }),
        ClsModule.forRoot({
          global: true,
        }),
        SequelizeModule.forRoot({
          dialect: "postgres",
          dialectModule: db.adapters.createPg(),
          autoLoadModels: true,
          synchronize: true,
          logging: false,
        }),
        FolderModule,
      ],
    }).compile();

    clsService = await testModule.resolve(ClsService);
    folderRepo = await testModule.resolve(FolderRepo);

    app = testModule.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  it("POST /folders/new", async () => {
    await clsService.runWith(
      {
        userId,
      },
      async () => {
        const payload = { name: "TestFolder" };

        await request(app.getHttpServer())
          .post("/folders/new")
          .send(payload)
          .set("Content-Type", "application/json")
          .set("Accept", "application/json")
          .expect(201);

        const folders = await folderRepo.findAll();

        expect(folders.length).toBe(1);
      }
    );
  });
});

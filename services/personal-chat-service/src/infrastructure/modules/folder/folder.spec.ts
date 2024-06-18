import { INestApplication } from "@nestjs/common";
import { SequelizeModule } from "@nestjs/sequelize";
import { Test, TestingModule } from "@nestjs/testing";
import { Id } from "ddd-node";
import { ClsModule, ClsService } from "nestjs-cls";
import { IMemoryDb, newDb } from "pg-mem";
import request from "supertest";
import { v4 } from "uuid";
import { AppCommand } from "../../../application/base/app-command";
import { FolderCreated } from "../../../domain/models/folder/events/folder-created";
import { CommandBusModule } from "../command-bus/command-bus.module";
import { EventBusModule } from "../event-bus/event-bus.module";
import { FolderRepo } from "./folder-repo/folder-repo";
import { FolderModule } from "./folder.module";
import { FolderItemRepo } from "./folder-item-repo/folder-item-repo";

describe("Folder Test", function () {
  type MyClsStore = { userId: string };

  let testModule: TestingModule;
  let db: IMemoryDb;
  let clsService: ClsService<MyClsStore>;
  let app: INestApplication;
  let folderRepo: FolderRepo;
  let folderItemRepo: FolderItemRepo;
  let userId: string;
  let folderId: string;
  let chatId: string;

  beforeAll(async () => {
    userId = v4();
    chatId = v4();

    db = newDb();

    testModule = await Test.createTestingModule({
      imports: [
        ClsModule.forRoot({
          global: true,
        }),
        CommandBusModule.forRootAsync({
          useFactory: (clsService: ClsService<MyClsStore>) => {
            return {
              hooks: {
                beforeExecute: (command: AppCommand) => {
                  command.setMetadata({ userId: clsService.get("userId") });
                },
              },
            };
          },
          inject: [ClsService],
          global: true,
        }),
        EventBusModule.forRoot({
          handlers: [
            {
              eventTypes() {
                return [FolderCreated];
              },

              async handleEvent(event: FolderCreated) {
                folderId = event.source().id.value;
              },
            },
          ],
          global: true,
        }),
        SequelizeModule.forRoot({
          dialect: "postgres",
          dialectModule: db.adapters.createPg(),
          autoLoadModels: true,
          synchronize: true,
          logging: false,
          // logQueryParameters: true,
        }),
        FolderModule,
      ],
    }).compile();

    clsService = await testModule.resolve(ClsService);
    folderRepo = await testModule.resolve(FolderRepo);
    folderItemRepo = await testModule.resolve(FolderItemRepo);

    app = testModule.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  it("POST /folders", async () => {
    await clsService.runWith(
      {
        userId,
      },
      async () => {
        const payload = { name: "TestFolder" };

        await request(app.getHttpServer())
          .post("/folders")
          .send(payload)
          .set("Content-Type", "application/json")
          .set("Accept", "application/json")
          .expect(201);

        const folder = await folderRepo.findById(new Id(folderId));

        expect(folder).not.toBeNull;
      }
    );
  });

  it("POST /folders/:folder_id/filters", async () => {
    await clsService.runWith({ userId }, async () => {
      const payload = {
        includedIds: [v4(), v4()],
        excludedIds: [v4()],
        muted: true,
        read: false,
        archived: false,
        type: "group",
      };

      await request(app.getHttpServer())
        .post(`/folders/${folderId}/filters`)
        .send(payload)
        .set("Content-Type", "application/json")
        .set("Accept", "application/json")
        .expect(201);

      const folder = await folderRepo.findById(new Id(folderId));

      expect(folder?.filters.length).toBe(5);
    });
  });

  // it("POST /folders/:folderId/pin", async () => {
  //   await clsService.run(async () => {
  //     const payload = { chatId, isPin: true };

  //     await request(app.getHttpServer())
  //       .post(`/folders/${folderId}/pin`)
  //       .send(payload)
  //       .set("Content-Type", "application/json")
  //       .set("Accept", "application/json")
  //       .expect(201);

  //     // const folder = await folderRepo.findById(new Id(folderId));

  //     // expect(folder?.pinnedItems.length).toBe(1);

  //     const folderItem = await folderItemRepo.findInFolder(
  //       new Id(folderId),
  //       new Id(chatId)
  //     );

  //     expect(folderItem?.pinned).toBe(true);
  //   });
  // });

  // it("POST /folders/:folderId/pin", async () => {
  //   await clsService.run(async () => {
  //     const payload = { chatId, isPin: false };

  //     await request(app.getHttpServer())
  //       .post(`/folders/${folderId}/pin`)
  //       .send(payload)
  //       .set("Content-Type", "application/json")
  //       .set("Accept", "application/json")
  //       .expect(201);

  //     const folder = await folderRepo.findById(new Id(folderId));

  //     expect(folder?.pinnedItems.length).toBe(0);
  //   });
  // });

  // it("PUT /folders/:folderId/name", async () => {
  //   await clsService.run(async () => {
  //     const payload = { name: "TestFolderNewName" };

  //     await request(app.getHttpServer())
  //       .put(`/folders/${folderId}/name`)
  //       .send(payload)
  //       .set("Content-Type", "application/json")
  //       .set("Accept", "application/json")
  //       .expect(200);

  //     const folder = await folderRepo.findById(new Id(folderId));

  //     expect(folder?.name).toBe("TestFolderNewName");
  //   });
  // });

  // it("DELETE /folders/:folderId", async () => {
  //   await clsService.run(async () => {
  //     await request(app.getHttpServer())
  //       .delete(`/folders/${folderId}`)
  //       .expect(200);

  //     const folders = await folderRepo.findAll();

  //     expect(folders.length).toBe(0);
  //   });
  // });
});

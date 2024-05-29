import { INestApplication } from "@nestjs/common";
import { SequelizeModule } from "@nestjs/sequelize";
import { Test, TestingModule } from "@nestjs/testing";
import { Id } from "ddd-node";
import { ClsModule, ClsService } from "nestjs-cls";
import { IMemoryDb, newDb } from "pg-mem";
import request from "supertest";
import { v4 } from "uuid";
import { AppCommand } from "../../../application/base/app-command";
import { PersonalChatCreated } from "../../../domain/models/personal-chat/events/personal-chat-created";
import { CommandBusModule } from "../command-bus/command-bus.module";
import { EventBusModule } from "../event-bus/event-bus.module";
import { PersonalChatRepo } from "./personal-chat-repo/personal-chat-repo";
import { PersonalChatModule } from "./personal-chat.module";

describe("Folder Test", function () {
  type MyClsStore = { userId: string };

  let testModule: TestingModule;
  let db: IMemoryDb;
  let clsService: ClsService<MyClsStore>;
  let app: INestApplication;
  let personalChatRepo: PersonalChatRepo;
  let userId: string;
  let chatId: string;

  beforeAll(async () => {
    userId = v4();

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
                return [PersonalChatCreated];
              },

              async handleEvent(event: PersonalChatCreated) {
                chatId = event.getSource().id.value;
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
        PersonalChatModule,
      ],
    }).compile();

    clsService = await testModule.resolve(ClsService);
    personalChatRepo = await testModule.resolve(PersonalChatRepo);

    app = testModule.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  it("POST /personal_chats", async () => {
    await clsService.run(async () => {
      await request(app.getHttpServer())
        .post("/personal_chats")
        .send({ sourceChatId: v4(), ownerUserId: v4(), type: "group" })
        .set("Content-Type", "application/json")
        .set("Accept", "application/json")
        .expect(201);

      const personalChat = await personalChatRepo.findById(new Id(chatId));

      expect(personalChat).not.toBeNull;
    });
  });
});

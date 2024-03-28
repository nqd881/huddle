import { Module } from "@nestjs/common";
import { SequelizeModule } from "@nestjs/sequelize";
import { ClsModule } from "nestjs-cls";
import { CommandBusModule } from "../command-bus/command-bus.module";
import { EventBusModule } from "../event-bus/event-bus.module";
import { PersonalChatModule } from "../personal-chat/personal-chat.module";
import { RepositoryModule } from "../repository/repository.module";
import { FolderModule } from "../folder/folder.module";
import { ItemModule } from "../item/item.module";

@Module({
  imports: [
    SequelizeModule.forRoot({
      dialect: "postgres",
      host: "localhost",
      port: 5432,
      username: "postgres",
      password: "123123",
      database: "postgres",
      autoLoadModels: true,
      synchronize: true,
      pool: {
        max: 5,
        min: 3,
      },
    }),
    ClsModule.forRoot({
      middleware: {
        mount: true,
      },
      global: true,
    }),
    CommandBusModule.forRoot({ global: true }),
    EventBusModule.forRoot({ global: true }),
    RepositoryModule,
    PersonalChatModule,
    FolderModule,
    ItemModule,
  ],
})
export class AppModule {}

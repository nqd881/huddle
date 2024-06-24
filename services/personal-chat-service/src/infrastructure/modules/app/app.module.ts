import { Module } from "@nestjs/common";
import { ClsModule } from "nestjs-cls";
import { CommandBusModule } from "../command-bus/command-bus.module";
import { DbModule } from "../db/db.module";
import { DebeziumModule } from "../debezium/debezium.module";
import { DomainEventPublisherModule } from "../domain-event-publisher/domain-event-publisher.module";
import { DomainRegistryModule } from "../domain-registry/domain-registry.module";
import { EnvConfigModule } from "../env-config/env-config.module";
import { EventBusModule } from "../event-bus/event-bus.module";
import { FolderModule } from "../folder/folder.module";
import { MyEventStoreModule } from "../my-event-store/my-event-store.module";
import { PersonalChatModule } from "../personal-chat/personal-chat.module";

@Module({
  imports: [
    EnvConfigModule,
    DbModule.forRoot(),
    ClsModule.forRoot({
      middleware: {
        mount: true,
      },
      global: true,
    }),
    CommandBusModule.forRoot({ global: true }),
    EventBusModule.forRoot({ global: true }),
    MyEventStoreModule,
    DebeziumModule.forRoot({ kafkaConnectUrl: "http://localhost:8083" }),
    DomainRegistryModule,
    DomainEventPublisherModule,
    PersonalChatModule,
    FolderModule,
  ],
})
export class AppModule {}

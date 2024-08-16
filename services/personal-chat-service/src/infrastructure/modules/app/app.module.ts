import { Module } from "@nestjs/common";
import { AppCoreModule } from "../app-core";
import { DbModule } from "../db/db.module";
import { DebeziumModule } from "../debezium/debezium.module";
import { DomainEventListenerModule } from "../domain-event-listener/domain-event-listener.module";
import { EnvConfigModule } from "../env-config/env-config.module";
import { FolderModule } from "../folder/folder.module";
import { MyClsModule } from "../my-cls/my-cls.module";
import { MyEventStoreModule } from "../my-event-store/my-event-store.module";
import { PersonalChatModule } from "../personal-chat/personal-chat.module";
import { RepoRegistryModule } from "../repo-registry/repo-registry.module";
import { UserModule } from "../user/user.module";
import { DomainModelSerdesModule } from "../domain-model-serdes/domain-model-serdes.module";
import { domainManager } from "ddd-node";

@Module({
  imports: [
    DomainModelSerdesModule.forRootAsync({
      useFactory: () => domainManager.getDomain(),
      global: true,
    }),
    EnvConfigModule,
    MyClsModule,
    DbModule.forRoot(),
    RepoRegistryModule,
    AppCoreModule,
    MyEventStoreModule,
    DebeziumModule.forRoot({ kafkaConnectUrl: "http://localhost:8083" }),
    DomainEventListenerModule,
    UserModule,
    PersonalChatModule,
    FolderModule,
  ],
})
export class AppModule {}

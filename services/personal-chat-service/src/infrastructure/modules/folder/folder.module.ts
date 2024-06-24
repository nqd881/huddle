import { Module } from "@nestjs/common";
import { IAppCommandBus } from "../../../application/base/app-command";
import { FolderAppService } from "../../../application/use-cases/folder-use-cases/folder-service";
import { IDomainRegistry } from "../../../domain/domain";
import { CommandBus } from "../command-bus/command-bus";
import { DomainRegistry } from "../domain-registry/domain-registry";
import { FolderItemRepoModule } from "../repositories/folder-item-repo";
import { FolderRepoModule } from "../repositories/folder-repo/folder-repo.module";
import { FolderEventHandlerProvider } from "./event-handler-provider";
import { FolderEventSerializersModule } from "./folder-event-serializers/folder-event-serializers.module";
import { FolderController } from "./folder.controller";
import { FOLDER_APP_SERVICE } from "./token";
import { FolderEventDeserializerModule } from "./folder-event-deserializers/folder-event-deserializers.module";

@Module({
  imports: [
    FolderRepoModule,
    FolderItemRepoModule,
    FolderEventSerializersModule,
    FolderEventDeserializerModule,
  ],
  controllers: [FolderController],
  providers: [
    {
      provide: FOLDER_APP_SERVICE,
      useFactory: (
        commandBus: IAppCommandBus,
        domainRegistry: IDomainRegistry
      ) => {
        return new FolderAppService(commandBus, domainRegistry);
      },
      inject: [CommandBus, DomainRegistry],
    },
    FolderEventHandlerProvider,
  ],
  exports: [
    FolderRepoModule,
    FolderItemRepoModule,
    FolderEventSerializersModule,
    FolderEventDeserializerModule,
  ],
})
export class FolderModule {}

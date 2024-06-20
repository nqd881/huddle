import { Module } from "@nestjs/common";
import { IAppCommandBus } from "../../../application/base/app-command";
import { FolderAppService } from "../../../application/services/folder-service/folder-service";
import { IFolderItemRepo } from "../../../domain/repositories/folder-item.repo";
import { IFolderRepo } from "../../../domain/repositories/folder.repo";
import { CommandBus } from "../command-bus/command-bus";
import { FolderEventHandlerProvider } from "./event-handler-provider";
import { FolderEventSerializersModule } from "./folder-event-serializers/folder-event-serializers.module";
import { FolderItemRepo } from "./folder-item-repo/folder-item-repo";
import { FolderItemRepoModule } from "./folder-item-repo/folder-item-repo.module";
import { FolderRepo } from "./folder-repo/folder-repo";
import { FolderRepoModule } from "./folder-repo/folder-repo.module";
import { FolderController } from "./folder.controller";
import { FOLDER_APP_SERVICE, FOLDER_ITEM_REPO, FOLDER_REPO } from "./token";

@Module({
  imports: [
    FolderRepoModule,
    FolderItemRepoModule,
    FolderEventSerializersModule,
  ],
  controllers: [FolderController],
  providers: [
    { provide: FOLDER_REPO, useExisting: FolderRepo },
    { provide: FOLDER_ITEM_REPO, useExisting: FolderItemRepo },
    {
      provide: FOLDER_APP_SERVICE,
      useFactory: (
        commandBus: IAppCommandBus,
        folderRepo: IFolderRepo,
        folderItemRepo: IFolderItemRepo
      ) => {
        return new FolderAppService(commandBus, folderRepo, folderItemRepo);
      },
      inject: [CommandBus, FOLDER_REPO, FOLDER_ITEM_REPO],
    },
    FolderEventHandlerProvider,
  ],
  exports: [FolderRepoModule, FolderItemRepoModule],
})
export class FolderModule {}

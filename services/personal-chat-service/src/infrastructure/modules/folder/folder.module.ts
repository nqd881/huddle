import { Module } from "@nestjs/common";
import { FolderEventHandlerProvider } from "./event-handler-provider";
import { FolderController } from "./folder.controller";
import { FolderRepoModule } from "./folder-repo/folder-repo.module";
import { FOLDER_APP_SERVICE, FOLDER_ITEM_REPO, FOLDER_REPO } from "./token";
import { FolderRepo } from "./folder-repo/folder-repo";
import { FolderAppService } from "../../../application/services/folder-service/folder-service";
import { IFolderRepo } from "../../../domain/repositories/folder.repo";
import { CommandBus } from "../command-bus/command-bus";
import { IAppCommandBus } from "../../../application/base/app-command";
import { FolderItemRepoModule } from "./folder-item-repo/folder-item-repo.module";
import { IFolderItemRepo } from "../../../domain/repositories/folder-item.repo";
import { FolderItemRepo } from "./folder-item-repo/folder-item-repo";

@Module({
  imports: [FolderRepoModule, FolderItemRepoModule],
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

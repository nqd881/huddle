import { Module } from "@nestjs/common";
import { FolderEventHandlerProvider } from "./event-handler-provider";
import { FolderController } from "./folder.controller";
import { FolderRepoModule } from "./folder-repo/folder-repo.module";
import { FOLDER_APP_SERVICE, FOLDER_REPO } from "./token";
import { FolderRepo } from "./folder-repo/folder-repo";
import { FolderAppService } from "../../../application/services/folder-service/folder-service";
import { IFolderRepo } from "../../../domain/repositories/folder.repo";
import { CommandBus } from "../command-bus/command-bus";
import { IAppCommandBus } from "../../../application/base/app-command";

@Module({
  imports: [FolderRepoModule],
  controllers: [FolderController],
  providers: [
    { provide: FOLDER_REPO, useExisting: FolderRepo },
    {
      provide: FOLDER_APP_SERVICE,
      useFactory: (commandBus: IAppCommandBus, folderRepo: IFolderRepo) => {
        return new FolderAppService(commandBus, folderRepo);
      },
      inject: [CommandBus, FOLDER_REPO],
    },
    FolderEventHandlerProvider,
  ],
  exports: [FolderRepoModule],
})
export class FolderModule {}

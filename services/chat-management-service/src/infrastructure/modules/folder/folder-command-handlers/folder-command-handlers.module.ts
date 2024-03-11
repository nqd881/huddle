import { Module } from "@nestjs/common";
import { CreateFolderHandler } from "../../../../application/services/folder-service/create-folder";
import { MovePinnedItemHandler } from "../../../../application/services/folder-service/move-pinned-item";
import { PinItemHandler } from "../../../../application/services/folder-service/pin-item";
import { RenameFolderHandler } from "../../../../application/services/folder-service/rename-folder";
import { UnpinItemHandler } from "../../../../application/services/folder-service/unpin-item";
import { IFolderRepo } from "../../../../domain/repositories/folder.repo";
import { FolderRepoModule } from "../folder-repo/folder-repo.module";
import { FOLDER_COMMAND_HANDLERS } from "./token";
import { FOLDER_REPOSITORY } from "../folder-repo/token";

@Module({
  imports: [FolderRepoModule],
  providers: [
    {
      provide: FOLDER_COMMAND_HANDLERS,
      useFactory: (folderRepo: IFolderRepo) => {
        return [
          new CreateFolderHandler(folderRepo),
          new PinItemHandler(folderRepo),
          new UnpinItemHandler(folderRepo),
          new MovePinnedItemHandler(folderRepo),
          new RenameFolderHandler(folderRepo),
        ];
      },
      inject: [FOLDER_REPOSITORY],
    },
  ],
  exports: [FOLDER_COMMAND_HANDLERS],
})
export class FolderCommandHandlersModule {}

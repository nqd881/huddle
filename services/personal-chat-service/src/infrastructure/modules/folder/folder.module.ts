import { Module } from "@nestjs/common";
import { FolderCommandHandlerProvider } from "./command-handler-provider";
import { FolderEventHandlerProvider } from "./event-handler-provider";
import { FolderController } from "./folder.controller";
import { FolderRepoModule } from "./folder-repo/folder-repo.module";
import { FOLDER_REPO } from "./token";
import { FolderRepo } from "./folder-repo/folder-repo";

@Module({
  imports: [FolderRepoModule],
  controllers: [FolderController],
  providers: [
    { provide: FOLDER_REPO, useExisting: FolderRepo },
    FolderCommandHandlerProvider,
    FolderEventHandlerProvider,
  ],
  exports: [FolderRepoModule],
})
export class FolderModule {}

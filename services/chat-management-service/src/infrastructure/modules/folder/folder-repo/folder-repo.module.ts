import { Module } from "@nestjs/common";
import { FolderRepo } from "./folder-repo";
import { FOLDER_REPOSITORY } from "./token";

@Module({
  providers: [
    {
      provide: FOLDER_REPOSITORY,
      useClass: FolderRepo,
    },
  ],
  exports: [FOLDER_REPOSITORY],
})
export class FolderRepoModule {}

import { Module } from "@nestjs/common";
import { SequelizeModule } from "@nestjs/sequelize";
import { RepoBaseModule } from "../../repo-base/repo-base.module";
import { FolderFilterMapper, FolderMapper } from "./folder-mapper";
import { FolderRepo } from "./folder-repo";
import {
  ChatArchivedFilterModel,
  ChatIdFilterModel,
  ChatMutedFilterModel,
  ChatReadFilterModel,
  ChatTypeFilterModel,
  FolderModel,
} from "./models";

@Module({
  imports: [
    SequelizeModule.forFeature([
      FolderModel,
      ChatIdFilterModel,
      ChatTypeFilterModel,
      ChatMutedFilterModel,
      ChatReadFilterModel,
      ChatArchivedFilterModel,
    ]),
    RepoBaseModule,
  ],
  providers: [FolderFilterMapper, FolderMapper, FolderRepo],
  exports: [FolderRepo],
})
export class FolderRepoModule {}

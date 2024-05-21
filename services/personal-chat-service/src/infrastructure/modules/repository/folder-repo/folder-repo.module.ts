import { Module } from "@nestjs/common";
import { SequelizeModule } from "@nestjs/sequelize";
import { RepoBaseModule } from "../repo-base/repo-base.module";
import { FolderMapper } from "./folder-mapper";
import { FolderRepo } from "./folder-repo";
import { FolderModel, PinnedItemModel } from "./folder-model";

@Module({
  imports: [
    RepoBaseModule,
    SequelizeModule.forFeature([FolderModel, PinnedItemModel]),
  ],
  providers: [FolderMapper, FolderRepo],
  exports: [FolderRepo],
})
export class FolderRepoModule {}

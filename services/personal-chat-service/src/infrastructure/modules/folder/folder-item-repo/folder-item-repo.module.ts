import { Module } from "@nestjs/common";
import { FolderItemModel } from "./folder-item.model";
import { SequelizeModule } from "@nestjs/sequelize";
import { RepoBaseModule } from "../../repo-base/repo-base.module";
import { FolderItemRepo } from "./folder-item-repo";
import { FolderItemMapper } from "./folder-item.mapper";

@Module({
  imports: [SequelizeModule.forFeature([FolderItemModel]), RepoBaseModule],
  providers: [FolderItemMapper, FolderItemRepo],
  exports: [FolderItemRepo],
})
export class FolderItemRepoModule {}

import { Module } from "@nestjs/common";
import { FolderItemModel } from "./folder-item.model";
import { SequelizeModule } from "@nestjs/sequelize";
import { RepoBaseModule } from "../../repo-base/repo-base.module";
import { FolderItemRepo } from "./folder-item-repo";
import { FolderItemMapper } from "./folder-item.mapper";
import { FOLDER_ITEM_REPO } from "./token";

@Module({
  imports: [SequelizeModule.forFeature([FolderItemModel]), RepoBaseModule],
  providers: [
    FolderItemMapper,
    {
      provide: FOLDER_ITEM_REPO,
      useClass: FolderItemRepo,
    },
  ],
  exports: [FOLDER_ITEM_REPO],
})
export class FolderItemRepoModule {}

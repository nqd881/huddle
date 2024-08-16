import { Module } from "@nestjs/common";
import { SequelizeModule } from "@nestjs/sequelize";
import { RepoBaseModule } from "../../repo-base/repo-base.module";
import { FolderRepo } from "./folder-repo";
import { FolderFilterMapper, FolderMapper, ItemMapper } from "./folder.mapper";
import { FolderFilterModel, FolderModel, ItemModel } from "./models";
import { FOLDER_REPO } from "./token";

@Module({
  imports: [
    SequelizeModule.forFeature([FolderModel, ItemModel, FolderFilterModel]),
    RepoBaseModule,
  ],
  providers: [
    FolderFilterMapper,
    ItemMapper,
    FolderMapper,
    { provide: FOLDER_REPO, useClass: FolderRepo },
  ],
  exports: [FOLDER_REPO],
})
export class FolderRepoModule {}

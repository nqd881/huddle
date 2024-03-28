import { Module } from "@nestjs/common";
import { SequelizeModule } from "@nestjs/sequelize";
import { RepoBaseModule } from "../repo-base/repo-base.module";
import { FolderMapper } from "./folder-mapper";
import {
  ArchivedCriterionModel,
  FolderModel,
  IdCriterionModel,
  SelectionModel,
  TagCriterionModel,
} from "./folder-model";
import { FolderRepo } from "./folder-repo";

@Module({
  imports: [
    RepoBaseModule,
    SequelizeModule.forFeature([
      FolderModel,
      SelectionModel,
      IdCriterionModel,
      TagCriterionModel,
      ArchivedCriterionModel,
    ]),
  ],
  providers: [FolderMapper, FolderRepo],
  exports: [FolderRepo],
})
export class FolderRepoModule {}

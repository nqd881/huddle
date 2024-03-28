import { Module } from "@nestjs/common";
import { RepoBaseModule } from "../repo-base/repo-base.module";
import { SequelizeModule } from "@nestjs/sequelize";
import { ItemModel } from "./item-model";
import { ItemRepo } from "./item-repo";
import { ItemMapper } from "./item-mapper";

@Module({
  imports: [RepoBaseModule, SequelizeModule.forFeature([ItemModel])],
  providers: [ItemMapper, ItemRepo],
  exports: [ItemRepo],
})
export class ItemRepoModule {}

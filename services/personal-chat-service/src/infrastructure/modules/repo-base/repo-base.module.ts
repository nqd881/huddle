import { Module } from "@nestjs/common";
import { RepoBaseService } from "./repo-base.service";
import { DomainUnitModule } from "../domain-unit/domain-unit.module";
import { SequelizeUpdateModule } from "../sequelize-update/sequelize-update.module";
import { DbModule } from "../db/db.module";

@Module({
  imports: [DbModule, DomainUnitModule, SequelizeUpdateModule],
  providers: [RepoBaseService],
  exports: [RepoBaseService],
})
export class RepoBaseModule {}

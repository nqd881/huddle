import { Module } from "@nestjs/common";
import { RepoBaseService } from "./repo-base.service";
import { UpdateService } from "./update.service";
import { DomainUnitService } from "./domain-unit.service";

@Module({
  providers: [UpdateService, DomainUnitService, RepoBaseService],
  exports: [UpdateService, DomainUnitService, RepoBaseService],
})
export class RepoBaseModule {}

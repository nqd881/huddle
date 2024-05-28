import { Module } from "@nestjs/common";
import { DomainUnitService } from "./domain-unit.service";

@Module({
  providers: [DomainUnitService],
  exports: [DomainUnitService],
})
export class DomainUnitModule {}

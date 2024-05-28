import { Module } from "@nestjs/common";
import { SequelizeUpdateService } from "./sequelize-update.service";
import { SequelizeModelMatchingService } from "./sequelize-model-matching.service";

@Module({
  providers: [SequelizeModelMatchingService, SequelizeUpdateService],
  exports: [SequelizeUpdateService],
})
export class SequelizeUpdateModule {}

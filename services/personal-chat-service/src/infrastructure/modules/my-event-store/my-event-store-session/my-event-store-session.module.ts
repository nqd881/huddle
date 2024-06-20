import { Module } from "@nestjs/common";
import { SequelizeModule } from "@nestjs/sequelize";
import { DbModule } from "../../db/db.module";
import { MyEventStoreSession } from "./my-event-store-session";
import { StoredEventModel } from "./stored-event.model";

@Module({
  imports: [DbModule, SequelizeModule.forFeature([StoredEventModel])],
  providers: [MyEventStoreSession],
  exports: [MyEventStoreSession],
})
export class MyEventStoreSessionModule {}

import { Module } from "@nestjs/common";
import { AppCoreModule } from "../app-core";
import { UserController } from "./user.controller";

@Module({
  imports: [AppCoreModule],
  controllers: [UserController],
  providers: [],
  exports: [],
})
export class UserModule {}

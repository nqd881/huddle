import { Module } from "@nestjs/common";
import { AppCoreModule } from "../app-core/app-core.module";
import { PersonalChatController } from "./personal-chat.controller";

@Module({
  imports: [AppCoreModule],
  controllers: [PersonalChatController],
})
export class PersonalChatModule {}

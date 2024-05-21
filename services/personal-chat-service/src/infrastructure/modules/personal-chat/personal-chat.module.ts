import { Module } from "@nestjs/common";
import { PersonalChatCommandHandlerProvider } from "./command-handler-provider";
import { PersonalChatEventHandlerProvider } from "./event-handler-provider";
import { PersonalChatController } from "./personal-chat.controller";

@Module({
  controllers: [PersonalChatController],
  providers: [
    PersonalChatCommandHandlerProvider,
    PersonalChatEventHandlerProvider,
  ],
})
export class PersonalChatModule {}

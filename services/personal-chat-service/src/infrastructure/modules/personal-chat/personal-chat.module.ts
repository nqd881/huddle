import { Module } from "@nestjs/common";
import { PersonalChatCommandHandlerProvider } from "./command-handler-provider";
import { PersonalChatEventHandlerProvider } from "./event-handler-provider";
import { PersonalChatController } from "./personal-chat.controller";
import { PersonalChatRepoModule } from "./personal-chat-repo/personal-chat-repo.module";
import { PERSONAL_CHAT_REPO } from "./token";
import { PersonalChatRepo } from "./personal-chat-repo/personal-chat-repo";

@Module({
  imports: [PersonalChatRepoModule],
  controllers: [PersonalChatController],
  providers: [
    { provide: PERSONAL_CHAT_REPO, useExisting: PersonalChatRepo },
    PersonalChatCommandHandlerProvider,
    PersonalChatEventHandlerProvider,
  ],
})
export class PersonalChatModule {}

import { Module } from "@nestjs/common";
import { PersonalChatRepo } from "./personal-chat-repo";
import { PERSONAL_CHAT_REPOSITORY } from "./token";

@Module({
  providers: [
    {
      provide: PERSONAL_CHAT_REPOSITORY,
      useClass: PersonalChatRepo,
    },
  ],
  exports: [PERSONAL_CHAT_REPOSITORY],
})
export class PersonalChatRepoModule {}

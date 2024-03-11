import { Module } from "@nestjs/common";
import { ArchivePersonalChatHandler } from "../../../../application/services/personal-chat-service/archive-personal-chat";
import { MarkPersonalChatAsReadHandler } from "../../../../application/services/personal-chat-service/mark-personal-chat-as-read";
import { MarkPersonalChatAsUnreadHandler } from "../../../../application/services/personal-chat-service/mark-personal-chat-as-unread";
import { SetNotificationsHandler } from "../../../../application/services/personal-chat-service/set-notifications";
import { UnarchivePersonalChatHandler } from "../../../../application/services/personal-chat-service/unarchive-personal-chat";
import { IPersonalChatRepo } from "../../../../domain/repositories/personal-chat.repo";
import { PersonalChatRepoModule } from "../personal-chat-repo/personal-chat-repo.module";
import { PERSONAL_CHAT_REPOSITORY } from "../personal-chat-repo/token";
import { PERSONAL_CHAT_COMMAND_HANDLERS } from "./token";

@Module({
  imports: [PersonalChatRepoModule],
  providers: [
    {
      provide: PERSONAL_CHAT_COMMAND_HANDLERS,
      useFactory: (personalChatRepo: IPersonalChatRepo) => {
        return [
          new ArchivePersonalChatHandler(personalChatRepo),
          new MarkPersonalChatAsReadHandler(personalChatRepo),
          new MarkPersonalChatAsUnreadHandler(personalChatRepo),
          new SetNotificationsHandler(personalChatRepo),
          new UnarchivePersonalChatHandler(personalChatRepo),
        ];
      },
      inject: [PERSONAL_CHAT_REPOSITORY],
    },
  ],
  exports: [PERSONAL_CHAT_COMMAND_HANDLERS],
})
export class PersonalChatCommandHandlersModule {}

import { Inject } from "@nestjs/common";
import { IAppCommandHandler } from "../../../application/base/app-command.base";
import { ArchivePersonalChatHandler } from "../../../application/services/personal-chat-service/archive-personal-chat";
import { CreatePersonalChatHandler } from "../../../application/services/personal-chat-service/create-personal-chat";
import { MarkPersonalChatAsReadHandler } from "../../../application/services/personal-chat-service/mark-personal-chat-as-read";
import { MarkPersonalChatAsUnreadHandler } from "../../../application/services/personal-chat-service/mark-personal-chat-as-unread";
import { SetNotificationsHandler } from "../../../application/services/personal-chat-service/set-notifications";
import { UnarchivePersonalChatHandler } from "../../../application/services/personal-chat-service/unarchive-personal-chat";
import { IPersonalChatRepo } from "../../../domain/repositories/personal-chat.repo";
import { CommandHandlerProvider } from "../command-bus/decorator";
import { ICommandHandlerProvider } from "../command-bus/interface";
import { PERSONAL_CHAT_REPO } from "./token";

@CommandHandlerProvider
export class PersonalChatCommandHandlerProvider
  implements ICommandHandlerProvider
{
  constructor(
    @Inject(PERSONAL_CHAT_REPO) private personalChatRepo: IPersonalChatRepo
  ) {}

  provideCommandHandlers(): IAppCommandHandler[] {
    const { personalChatRepo } = this;

    return [
      new CreatePersonalChatHandler(personalChatRepo),
      new ArchivePersonalChatHandler(personalChatRepo),
      new MarkPersonalChatAsReadHandler(personalChatRepo),
      new MarkPersonalChatAsUnreadHandler(personalChatRepo),
      new SetNotificationsHandler(personalChatRepo),
      new UnarchivePersonalChatHandler(personalChatRepo),
    ];
  }
}

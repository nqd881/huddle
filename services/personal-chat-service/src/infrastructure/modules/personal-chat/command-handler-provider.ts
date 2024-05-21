import { ICommand, ICommandHandler } from "../../../application/interfaces";
import { ArchivePersonalChatHandler } from "../../../application/services/personal-chat-service/archive-personal-chat";
import { CreatePersonalChatHandler } from "../../../application/services/personal-chat-service/create-personal-chat";
import { MarkPersonalChatAsReadHandler } from "../../../application/services/personal-chat-service/mark-personal-chat-as-read";
import { MarkPersonalChatAsUnreadHandler } from "../../../application/services/personal-chat-service/mark-personal-chat-as-unread";
import { SetNotificationsHandler } from "../../../application/services/personal-chat-service/set-notifications";
import { UnarchivePersonalChatHandler } from "../../../application/services/personal-chat-service/unarchive-personal-chat";
import { CommandHandlerProvider } from "../command-bus/decorator";
import { ICommandHandlerProvider } from "../command-bus/interface";
import { RepositoryService } from "../repository/repository.service";

@CommandHandlerProvider
export class PersonalChatCommandHandlerProvider
  implements ICommandHandlerProvider
{
  constructor(private repoService: RepositoryService) {}

  provideCommandHandlers(): ICommandHandler<ICommand, any>[] {
    const { personalChatRepo } = this.repoService;

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

import { IPersonalChatRepo } from "../../../domain/repositories/personal-chat.repo";
import { IAppCommandBus } from "../../base/app-command";
import { AppServiceBase } from "../app-service.base";
import {
  ArchivePersonalChatCommand,
  ArchivePersonalChatHandler,
} from "./archive-personal-chat";
import {
  CreatePersonalChatCommand,
  CreatePersonalChatHandler,
} from "./create-personal-chat";
import {
  MarkPersonalChatAsReadCommand,
  MarkPersonalChatAsReadHandler,
} from "./mark-personal-chat-as-read";
import {
  MarkPersonalChatAsUnreadCommand,
  MarkPersonalChatAsUnreadHandler,
} from "./mark-personal-chat-as-unread";
import {
  SetPersonalChatNotificationsCommand,
  SetPersonalChatNotificationsHandler,
} from "./set-personal-chat-notifications";
import {
  UnarchivePersonalChatCommand,
  UnarchivePersonalChatHandler,
} from "./unarchive-personal-chat";

export class PersonalChatAppService extends AppServiceBase {
  constructor(
    commandBus: IAppCommandBus,
    private personalChatRepo: IPersonalChatRepo
  ) {
    super(commandBus);

    this.commandBus.registerHandlers([
      new CreatePersonalChatHandler(this.personalChatRepo),
      new ArchivePersonalChatHandler(this.personalChatRepo),
      new UnarchivePersonalChatHandler(this.personalChatRepo),
      new MarkPersonalChatAsReadHandler(this.personalChatRepo),
      new MarkPersonalChatAsUnreadHandler(this.personalChatRepo),
      new SetPersonalChatNotificationsHandler(this.personalChatRepo),
    ]);
  }

  createPersonalChat = this.buildService(CreatePersonalChatCommand);
  archivePersonalChat = this.buildService(ArchivePersonalChatCommand);
  unarchivePersonalChat = this.buildService(UnarchivePersonalChatCommand);
  markPersonalChatAsRead = this.buildService(MarkPersonalChatAsReadCommand);
  markPersonalChatAsUnread = this.buildService(MarkPersonalChatAsUnreadCommand);
  setPersonalChatNotifications = this.buildService(
    SetPersonalChatNotificationsCommand
  );
}

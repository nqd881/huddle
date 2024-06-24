import { IDomainRegistry } from "../../../domain/domain";
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
  constructor(commandBus: IAppCommandBus, domainRegistry: IDomainRegistry) {
    super(commandBus);

    this.commandBus.registerHandlers([
      new CreatePersonalChatHandler(domainRegistry),
      new ArchivePersonalChatHandler(domainRegistry),
      new UnarchivePersonalChatHandler(domainRegistry),
      new MarkPersonalChatAsReadHandler(domainRegistry),
      new MarkPersonalChatAsUnreadHandler(domainRegistry),
      new SetPersonalChatNotificationsHandler(domainRegistry),
    ]);
  }

  createPersonalChat = this.buildService<CreatePersonalChatCommand>();
  archivePersonalChat = this.buildService<ArchivePersonalChatCommand>();
  unarchivePersonalChat = this.buildService<UnarchivePersonalChatCommand>();
  markPersonalChatAsRead = this.buildService<MarkPersonalChatAsReadCommand>();
  markPersonalChatAsUnread =
    this.buildService<MarkPersonalChatAsUnreadCommand>();
  setPersonalChatNotifications =
    this.buildService<SetPersonalChatNotificationsCommand>();
}

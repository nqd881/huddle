import { CommandHandlerModule } from "../command-handler-module";
import { ArchivePersonalChatHandler } from "./archive-personal-chat";
import { CreatePersonalChatHandler } from "./create-chat";
import { MarkPersonalChatAsReadHandler } from "./mark-personal-chat-as-read";
import { MarkPersonalChatAsUnreadHandler } from "./mark-personal-chat-as-unread";
import { SetPersonalChatNotificationsHandler } from "./set-personal-chat-notifications";
import { UnarchivePersonalChatHandler } from "./unarchive-personal-chat";

export const PersonalChatCommandHandlerModule = new CommandHandlerModule([
  CreatePersonalChatHandler,
  ArchivePersonalChatHandler,
  UnarchivePersonalChatHandler,
  MarkPersonalChatAsReadHandler,
  MarkPersonalChatAsUnreadHandler,
  SetPersonalChatNotificationsHandler,
]);

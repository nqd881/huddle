import { Event } from "ddd-node";
import {
  PersonalChatEvent,
  PersonalChatEventProps,
} from "./personal-chat-event.base";

export interface PersonalChatArchivedProps extends PersonalChatEventProps {}

@Event("PERSONAL_CHAT_ARCHIVED")
export class PersonalChatArchived extends PersonalChatEvent<PersonalChatArchivedProps> {}

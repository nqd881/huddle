import { Event } from "ddd-node";
import {
  PersonalChatEvent,
  PersonalChatEventProps,
} from "./personal-chat-event.base";

export interface PersonalChatUnarchivedProps extends PersonalChatEventProps {}

@Event("PERSONAL_CHAT_UNARCHIVED")
export class PersonalChatUnarchived extends PersonalChatEvent<PersonalChatUnarchivedProps> {}

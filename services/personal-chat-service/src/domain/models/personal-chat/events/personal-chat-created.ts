import { EventBase, Id } from "ddd-node";
import { ChatType } from "../chat-type";

export interface PersonalChatCreatedProps {
  personalChatId: Id;
  sourceChatId: Id;
  ownerUserId: Id;
  type: ChatType;
}

export class PersonalChatCreated extends EventBase<PersonalChatCreatedProps> {}

import { Event, EventBase, Id, Model } from "ddd-node";
import { ChatType } from "../chat-type";

export interface PersonalChatCreatedProps {
  personalChatId: Id;
  sourceChatId: Id;
  ownerUserId: Id;
  type: ChatType;
}

@Event("PERSONAL_CHAT_CREATED")
@Model()
export class PersonalChatCreated extends EventBase<PersonalChatCreatedProps> {}

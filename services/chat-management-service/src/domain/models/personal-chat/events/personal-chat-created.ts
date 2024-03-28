import { Event, event } from "ddd-node";

export interface PersonalChatCreatedProps {
  personalChatId: string;
  sourceChatId: string;
  ownerUserId: string;
}

@event()
export class PersonalChatCreated extends Event<PersonalChatCreatedProps> {}

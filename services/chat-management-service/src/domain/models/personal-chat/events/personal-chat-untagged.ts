import { Event, event } from "ddd-node";

export interface PersonalChatUntaggedProps {
  tagName: string;
  tagValue: string;
}

@event()
export class PersonalChatUntagged extends Event<PersonalChatUntaggedProps> {}

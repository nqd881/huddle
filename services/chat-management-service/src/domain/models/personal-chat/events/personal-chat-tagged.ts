import { Event, event } from "ddd-node";

export interface PersonalChatTaggedProps {
  tagName: string;
  tagValue: string;
}

@event()
export class PersonalChatTagged extends Event<PersonalChatTaggedProps> {}

import { Event, event } from "ddd-node";

export interface PersonalChatCreatedProps {}

@event()
export class PersonalChatCreated extends Event<PersonalChatCreatedProps> {}

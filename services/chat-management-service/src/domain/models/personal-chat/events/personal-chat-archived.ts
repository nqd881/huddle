import { EmptyProps, Event, event } from "ddd-node";

@event()
export class PersonalChatArchived extends Event<EmptyProps> {}

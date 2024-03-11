import { EmptyProps, Event, event } from "ddd-node";

@event()
export class PersonalChatUnarchived extends Event<EmptyProps> {}

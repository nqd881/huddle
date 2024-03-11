import { Event, event } from "ddd-node";
import { ReadingStatus } from "../reading-status-marker";

export interface PersonalChatMarkedProps {
  status: ReadingStatus;
  markedDate: Date;
}

@event()
export class PersonalChatMarked extends Event<PersonalChatMarkedProps> {}

import { EventBase } from "ddd-node";
import { ReadingStatus } from "../reading-status-marker";

export interface PersonalChatMarkedProps {
  status: ReadingStatus;
  markedDate: Date;
}

export class PersonalChatMarked extends EventBase<PersonalChatMarkedProps> {}

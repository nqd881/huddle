import { Prop, ValueObjectBase } from "ddd-node";
import { ChatReadingStatus } from "./chat-reading-status";

export interface ChatReadingMarkerProps {
  markedStatus: ChatReadingStatus;
  markedTime: Date;
}

export class ChatReadingMarker extends ValueObjectBase<ChatReadingMarkerProps> {
  @Prop()
  declare markedStatus: ChatReadingStatus;

  @Prop()
  declare markedTime: Date;
}

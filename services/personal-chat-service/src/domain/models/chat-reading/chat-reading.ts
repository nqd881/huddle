import { Prop, StateAggregateBase, StateAggregateBuilder } from "ddd-node";
import { ChatReadingMarker } from "./chat-reading-marker";
import { ChatReadingStatus } from "./chat-reading-status";

export interface ChatReadingProps {
  marker?: ChatReadingMarker;
}

export class ChatReading extends StateAggregateBase<ChatReadingProps> {
  @Prop()
  declare marker?: ChatReadingMarker;

  markAs(status: ChatReadingStatus) {
    const newMarker = new ChatReadingMarker({
      markedStatus: status,
      markedTime: new Date(),
    });

    this._props.marker = newMarker;
  }
}

export class ChatReadingBuilder extends StateAggregateBuilder<ChatReading> {
  constructor() {
    super(ChatReading);
  }
}

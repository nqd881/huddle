import { ChatEvent, ChatEventProps } from "./chat-event.base";

export interface ChatMarkedProps extends ChatEventProps {
  markedStatus: string;
  markedTime: Date;
}

export class ChatMarked extends ChatEvent<ChatMarkedProps> {}

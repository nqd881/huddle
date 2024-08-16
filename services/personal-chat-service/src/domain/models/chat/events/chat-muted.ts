import { ChatEvent, ChatEventProps } from "./chat-event.base";

export interface ChatMutedProps extends ChatEventProps {
  mutedUntil?: Date;
}

export class ChatMuted extends ChatEvent<ChatMutedProps> {}

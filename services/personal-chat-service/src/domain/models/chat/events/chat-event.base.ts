import { EventBase } from "ddd-node";

export interface ChatEventProps {
  userId: string;
  chatId: string;
}

export class ChatEvent<
  P extends ChatEventProps = ChatEventProps
> extends EventBase<P> {}

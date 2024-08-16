import { EventBase, Id } from "ddd-node";

export interface PersonalChatEventProps {
  userId: Id;
  chatId: Id;
}

export class PersonalChatEvent<
  P extends PersonalChatEventProps
> extends EventBase<P> {}

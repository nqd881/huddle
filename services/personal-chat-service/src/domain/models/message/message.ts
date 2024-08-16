import { Id, Prop, ValueObjectBase } from "ddd-node";

export interface MessageProps {
  messageId: Id;
  messageTime: Date;
  // isLastMessage: boolean;
}

export class Message extends ValueObjectBase<MessageProps> {
  @Prop()
  declare messageId: Id;

  @Prop()
  declare messageTime: Date;

  // @Prop()
  // declare isLastMessage: boolean;
}

import { Id, Prop, ValueObjectBase } from "ddd-node";
import { ChatType } from "../personal-chat/chat-type";

export interface ChatDescriptorProps {
  chatId: Id;
  type: ChatType;
  isMuted: boolean;
  isArchived: boolean;
  isRead: boolean;
}

export class ChatDescriptor extends ValueObjectBase<ChatDescriptorProps> {
  @Prop()
  declare chatId: Id;

  @Prop()
  declare type: ChatType;

  @Prop()
  declare isMuted: boolean;

  @Prop()
  declare isArchived: boolean;

  @Prop()
  declare isRead: boolean;
}

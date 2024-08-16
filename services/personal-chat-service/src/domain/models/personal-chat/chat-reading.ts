import {
  Enum,
  EnumBase,
  Id,
  Prop,
  StateAggregateBase,
  ValueObjectBase,
} from "ddd-node";

export class ChatReadingStatus extends EnumBase {
  @Enum("read")
  static readonly Read: ChatReadingStatus;

  @Enum("unread")
  static readonly Unread: ChatReadingStatus;

  isRead() {
    return this === ChatReadingStatus.Read;
  }

  isUnread() {
    return this === ChatReadingStatus.Unread;
  }
}

//

export interface MessageProps {
  messageId: Id;
  messageTime: Date;
  isLastMessage: boolean;
}

export class Message extends ValueObjectBase<MessageProps> {
  @Prop()
  declare messageId: Id;

  @Prop()
  declare messageTime: Date;

  @Prop()
  declare isLastMessage: boolean;
}

//

export interface ChatReadingProps {
  lastMessageRead?: Message;
  status: ChatReadingStatus;
  marked: boolean;
  markedTime?: Date;
}

export class ChatReading extends StateAggregateBase<ChatReadingProps> {
  @Prop()
  declare lastMessageRead?: Message;

  @Prop()
  declare status: ChatReadingStatus;

  @Prop()
  declare marked: boolean;

  @Prop()
  declare markedTime?: Date;

  isMarkedAsRead() {
    return this.marked && this.status.isRead();
  }

  isMarkedAsUnread() {
    return this.marked && this.status.isUnread();
  }

  updateLastMessageRead(message: Message) {
    this._props.lastMessageRead = message;

    if (!this.marked) return;

    if (
      this.lastMessageRead!.messageTime.getTime() > this.markedTime!.getTime()
    ) {
      this._props.marked = false;
      this._props.markedTime = undefined;
    }

    if (this.isMarkedAsUnread() && this.lastMessageRead!.isLastMessage)
      this._props.status = ChatReadingStatus.Read;
  }

  mark(status: ChatReadingStatus) {
    this._props.marked = true;
    this._props.markedTime = new Date();
    this._props.status = status;
  }
}

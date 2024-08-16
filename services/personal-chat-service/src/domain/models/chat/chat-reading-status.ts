import { Enum, EnumBase } from "ddd-node";

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

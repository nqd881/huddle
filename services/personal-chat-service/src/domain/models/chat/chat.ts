import { Id, Prop, StateAggregateBase, StateAggregateBuilder } from "ddd-node";
import { ChatReadingMarker } from "./chat-reading-marker";
import { ChatReadingStatus } from "./chat-reading-status";
import { ChatMarked } from "./events/chat-marked";
import { ChatUnmarked } from "./events/chat-unmarked";
import { ChatArchived } from "./events/chat-archived";
import { ChatUnarchived } from "./events/chat-unarchived";
import { ChatNotifications } from "./chat-notifications";
import { ChatMuted } from "./events/chat-muted";
import { ChatUnmuted } from "./events/chat-unmuted";

export interface ChatProps {
  readonly userId: Id;
  readonly chatId: Id;
  type: string;
  archived: boolean;
  notifications: ChatNotifications;
  readingMarker?: ChatReadingMarker;
}

export class Chat extends StateAggregateBase<ChatProps> {
  @Prop()
  declare userId: Id;

  @Prop()
  declare chatId: Id;

  @Prop()
  declare type: string;

  @Prop()
  declare archived: boolean;

  @Prop()
  declare notifications: ChatNotifications;

  @Prop()
  declare readingMarker?: ChatReadingMarker;

  isMarked() {
    return Boolean(this.readingMarker);
  }

  markAs(readingStatus: ChatReadingStatus) {
    const marker = new ChatReadingMarker({
      markedStatus: readingStatus,
      markedTime: new Date(),
    });

    this._props.readingMarker = marker;

    this.recordEvent(ChatMarked, {
      userId: this.userId,
      chatId: this.chatId,
      markedStatus: marker.markedStatus.value.toString(),
      markedTime: marker.markedTime,
    });
  }

  unmark() {
    delete this._props.readingMarker;

    this.recordEvent(ChatUnmarked, {
      userId: this.userId,
      chatId: this.chatId,
    });
  }

  archive() {
    if (this.archived) return;

    this._props.archived = true;

    this.recordEvent(ChatArchived, {
      userId: this.userId,
      chatId: this.chatId,
    });
  }

  unarchive() {
    if (!this.archived) return;

    this._props.archived = false;

    this.recordEvent(ChatUnarchived, {
      userId: this.userId,
      chatId: this.chatId,
    });
  }

  mute(untilDate?: Date) {
    this._props.notifications = new ChatNotifications({
      enabled: false,
      mutedUntil: untilDate,
    });

    this.recordEvent(ChatMuted, {
      userId: this.userId,
      chatId: this.chatId,
      mutedUntil: this.notifications.mutedUntil,
    });
  }

  unmute() {
    this._props.notifications = new ChatNotifications({ enabled: true });

    this.recordEvent(ChatUnmuted, {
      userId: this.userId,
      chatId: this.chatId,
    });
  }
}

export class ChatBuilder extends StateAggregateBuilder<Chat> {
  constructor() {
    super(Chat);
  }

  static new() {
    return new this();
  }
}

import { StateAggregateBase, Id, Prop } from "ddd-node";
import { Notifications } from "../notifications";
import { ChatType } from "./chat-type";
import {
  PersonalChatArchived,
  PersonalChatMarked,
  PersonalChatNotificationsUpdated,
  PersonalChatUnarchived,
  PersonalChatUnmarked,
} from "./events";
import { PersonalChatCreated } from "./events/personal-chat-created";
import { ReadingStatusMarker } from "./reading-status-marker";

export interface PersonalChatProps {
  readonly sourceChatId: Id;
  readonly ownerUserId: Id;
  type: ChatType;
  notifications: Notifications;
  archived: boolean;
  readingStatusMarker?: ReadingStatusMarker;
}

export type CreatePersonalChatProps = {
  sourceChatId: Id;
  ownerUserId: Id;
  type: ChatType;
};

export class PersonalChat extends StateAggregateBase<PersonalChatProps> {
  static DefaultNotifications: Notifications = new Notifications({});

  static create(props: CreatePersonalChatProps) {
    const { sourceChatId, ownerUserId, type } = props;

    const personalChat = this.newAggregate({
      sourceChatId,
      ownerUserId,
      type,
      notifications: this.DefaultNotifications,
      archived: false,
    });

    personalChat.recordEvent(PersonalChatCreated, {
      personalChatId: personalChat.id(),
      sourceChatId: personalChat.sourceChatId,
      ownerUserId: personalChat.ownerUserId,
      type: personalChat.type,
    });

    return personalChat;
  }

  @Prop()
  declare sourceChatId: Id;

  @Prop()
  declare ownerUserId: Id;

  @Prop()
  declare type: ChatType;

  @Prop()
  declare notifications: Notifications;

  @Prop()
  declare readingStatusMarker: ReadingStatusMarker;

  @Prop()
  declare archived: boolean;

  isMarked() {
    return Boolean(this.readingStatusMarker);
  }

  mark(marker: ReadingStatusMarker) {
    this._props.readingStatusMarker = marker;

    this.recordEvent(PersonalChatMarked, {
      status: this._props.readingStatusMarker!.status,
      markedDate: this._props.readingStatusMarker!.markedDate,
    });
  }

  unmark() {
    if (!this.isMarked()) throw new Error("Chat is not marked");

    this._props.readingStatusMarker = undefined;

    this.recordEvent(PersonalChatUnmarked, {});
  }

  setNotifications(notifications: Notifications) {
    this._props.notifications = notifications;

    this.recordEvent(PersonalChatNotificationsUpdated, {});
  }

  archive() {
    if (this.archived) throw new Error("Chat is archived");

    this._props.archived = true;

    this.recordEvent(PersonalChatArchived, {});
  }

  unarchive() {
    if (!this.archived) throw new Error("Chat is not archived");

    this._props.archived = false;

    this.recordEvent(PersonalChatUnarchived, {});
  }
}

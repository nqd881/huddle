import { StateAggregateBase, Id, Prop, StateAggregateBuilder } from "ddd-node";
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
  readonly ownerUserId: Id;
  type: ChatType;
  // notifications: Notifications;
  archived: boolean;
  // readingStatusMarker?: ReadingStatusMarker;
}

// export type CreatePersonalChatProps = {
//   ownerUserId: Id;
//   type: ChatType;
// };

export class PersonalChat extends StateAggregateBase<PersonalChatProps> {
  static DefaultNotifications: Notifications = new Notifications({});

  // static create(props: CreatePersonalChatProps) {
  //   const { ownerUserId, type } = props;

  //   const builder = new StateAggregateBuilder(PersonalChat);

  //   const personalChat = builder
  //     .withProps({
  //       ownerUserId,
  //       type,
  //       notifications: this.DefaultNotifications,
  //       archived: false,
  //     })
  //     .build();

  //   personalChat.recordEvent(PersonalChatCreated, {
  //     personalChatId: personalChat.id(),
  //     sourceChatId: personalChat.sourceChatId,
  //     ownerUserId: personalChat.ownerUserId,
  //     type: personalChat.type,
  //   });

  //   return personalChat;
  // }

  // @Prop()
  // declare sourceChatId: Id;

  @Prop()
  declare ownerUserId: Id;

  @Prop()
  declare type: ChatType;

  @Prop()
  // declare notifications: Notifications;
  @Prop()
  // declare readingStatusMarker: ReadingStatusMarker;
  @Prop()
  declare archived: boolean;

  // isMarked() {
  //   return Boolean(this.readingStatusMarker);
  // }

  // isMarkedAsRead() {}

  // isMuted() {
  //   return this.notifications.isMuted();
  // }

  // mark(marker: ReadingStatusMarker) {
  //   this._props.readingStatusMarker = marker;

  //   this.recordEvent(PersonalChatMarked, {
  //     status: this._props.readingStatusMarker!.status,
  //     markedDate: this._props.readingStatusMarker!.markedDate,
  //   });
  // }

  // unmark() {
  //   if (!this.isMarked()) return;

  //   this._props.readingStatusMarker = undefined;

  //   this.recordEvent(PersonalChatUnmarked, {});
  // }

  // setNotifications(notifications: Notifications) {
  //   this._props.notifications = notifications;

  //   this.recordEvent(PersonalChatNotificationsUpdated, {});
  // }

  archive() {
    if (this.archived) return;

    this._props.archived = true;

    this.recordEvent(PersonalChatArchived, {
      userId: this.ownerUserId,
      chatId: this.id(),
    });
  }

  unarchive() {
    if (!this.archived) return;

    this._props.archived = false;

    this.recordEvent(PersonalChatUnarchived, {
      userId: this.ownerUserId,
      chatId: this.id(),
    });
  }
}

export class PersonalChatBuilder extends StateAggregateBuilder<PersonalChat> {
  constructor() {
    super(PersonalChat);
  }
}

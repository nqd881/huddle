import { Aggregate, Id, aggregate } from "ddd-node";
import { Notifications } from "../notifications";
import { Tag } from "../tag";
import {
  PersonalChatArchived,
  PersonalChatMarked,
  PersonalChatNotificationsUpdated,
  PersonalChatUnarchived,
  PersonalChatUnmarked,
} from "./events";
import { PersonalChatTagged } from "./events/personal-chat-tagged";
import { PersonalChatUntagged } from "./events/personal-chat-untagged";
import { ReadingStatusMarker } from "./reading-status-marker";
import { PersonalChatCreated } from "./events/personal-chat-created";

export interface PersonalChatProps {
  readonly sourceChatId: Id;
  readonly ownerUserId: Id;
  notifications: Notifications;
  archived: boolean;
  tags: Tag[];
  readingStatusMarker?: ReadingStatusMarker;
}

export type CreatePersonalChatProps = {
  sourceChatId: Id;
  ownerUserId: Id;
  tags?: Tag[];
};

@aggregate()
export class PersonalChat extends Aggregate<PersonalChatProps> {
  static DefaultNotifications: Notifications = new Notifications({});

  static create(props: CreatePersonalChatProps) {
    const { sourceChatId, ownerUserId, tags } = props;

    const personalChat = this.newAggregate({
      sourceChatId,
      ownerUserId,
      notifications: this.DefaultNotifications,
      archived: false,
      tags: tags || [],
    });

    personalChat.recordEvent(PersonalChatCreated, {
      personalChatId: personalChat.getId().value,
      sourceChatId: personalChat.getSourceChatId().value,
      ownerUserId: personalChat.getOwnerUserId().value,
    });

    return personalChat;
  }

  getSourceChatId() {
    return this._props.sourceChatId;
  }

  getOwnerUserId() {
    return this._props.ownerUserId;
  }

  getNotifications() {
    return this._props.notifications;
  }

  getTags() {
    return this._props.tags;
  }

  isMarked() {
    return Boolean(this._props.readingStatusMarker);
  }

  isArchived() {
    return this._props.archived;
  }

  mark(marker: ReadingStatusMarker) {
    this._props.readingStatusMarker = marker;

    this.recordEvent(PersonalChatMarked, {
      status: this._props.readingStatusMarker!.status,
      markedDate: this._props.readingStatusMarker!.markedDate,
    });
  }

  unmark() {
    if (!this.isMarked()) throw new Error();

    this._props.readingStatusMarker = undefined;

    this.recordEvent(PersonalChatUnmarked, {});
  }

  setNotifications(notifications: Notifications) {
    this._props.notifications = notifications;

    this.recordEvent(PersonalChatNotificationsUpdated, {});
  }

  archive() {
    if (this.isArchived()) throw new Error();

    this._props.archived = true;

    this.recordEvent(PersonalChatArchived, {});
  }

  unarchive() {
    if (!this.isArchived()) throw new Error();

    this._props.archived = false;

    this.recordEvent(PersonalChatUnarchived, {});
  }

  isTaggedWith(tag: Tag) {
    return this._props.tags.some((_tag) => _tag.equals(tag));
  }

  tag(tag: Tag) {
    if (this.isTaggedWith(tag)) throw new Error();

    this._props.tags.push(tag);

    this.recordEvent(PersonalChatTagged, {
      tagName: tag.name,
      tagValue: tag.value,
    });
  }

  untag(tag: Tag) {
    if (!this.isTaggedWith(tag)) throw new Error();

    this._props.tags = this._props.tags.filter((_tag) => !_tag.equals(tag));

    this.recordEvent(PersonalChatUntagged, {
      tagName: tag.name,
      tagValue: tag.value,
    });
  }
}

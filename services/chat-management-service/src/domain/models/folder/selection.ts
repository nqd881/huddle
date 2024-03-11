import { Id, ValueObject, valueObject } from "ddd-node";
import { Tag } from "../tag";
import { PersonalChat } from "../personal-chat/personal-chat";

export abstract class Selection<
  Props extends object
> extends ValueObject<Props> {
  abstract isPersonalChatSelected(personalChat: PersonalChat): boolean;
}

export interface IdSelectionProps {
  ids: Id[];
}

@valueObject()
export class IdSelection extends Selection<IdSelectionProps> {
  get ids() {
    return this._props.ids;
  }

  isPersonalChatSelected(personalChat: PersonalChat): boolean {
    return this.ids.some((id) => personalChat.hasId(id));
  }
}

export interface TagSelectionProps {
  tags: Tag[];
}

@valueObject()
export class TagSelection extends Selection<TagSelectionProps> {
  get tags() {
    return this._props.tags;
  }

  isPersonalChatSelected(personalChat: PersonalChat): boolean {
    return this.tags.some((tag) => personalChat.isTaggedWith(tag));
  }
}

export interface ArchivedSelectionProps {
  isArchived: boolean;
}

@valueObject()
export class ArchivedSelection extends Selection<ArchivedSelectionProps> {
  get isArchived() {
    return this._props.isArchived;
  }

  isPersonalChatSelected(personalChat: PersonalChat): boolean {
    return this.isArchived === personalChat.isArchived();
  }
}

export type AnySelection = Selection<any>;

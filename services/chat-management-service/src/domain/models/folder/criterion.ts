import { Id, ValueObject, valueObject } from "ddd-node";
import { PersonalChat } from "../personal-chat/personal-chat";
import { Tag } from "../tag";

export const CRITERIAL_TYPE = "criterion" as const;

export type CriterionType<T extends string = string> =
  `${typeof CRITERIAL_TYPE}#${T}`;

export const makeCriterionType = (type: string): CriterionType => {
  return `${CRITERIAL_TYPE}#${type}`;
};

export interface ICriterion {
  getCriterionType(): CriterionType;

  match(personalChat: PersonalChat): boolean;
}

export abstract class Criterion<Props extends object>
  extends ValueObject<Props>
  implements ICriterion
{
  abstract getCriterionType(): CriterionType;

  abstract match(personalChat: PersonalChat): boolean;
}

export interface IdCriterionProps {
  ids: Id[];
}

@valueObject()
export class IdCriterion extends Criterion<IdCriterionProps> {
  getCriterionType() {
    return makeCriterionType("id");
  }

  get ids() {
    return this._props.ids;
  }

  match(personalChat: PersonalChat) {
    return this.ids.some((id) => personalChat.hasId(id));
  }
}

export interface TagCriterionProps {
  tags: Tag[];
}

@valueObject()
export class TagCriterion extends Criterion<TagCriterionProps> {
  getCriterionType() {
    return makeCriterionType("tag");
  }

  get tags() {
    return this._props.tags;
  }

  match(personalChat: PersonalChat): boolean {
    return this.tags.some((tag) => personalChat.isTaggedWith(tag));
  }
}

export interface ArchivedCriterionlProps {
  isArchived: boolean;
}

@valueObject()
export class ArchivedCriterion extends Criterion<ArchivedCriterionlProps> {
  getCriterionType() {
    return makeCriterionType("archived");
  }

  get isArchived() {
    return this._props.isArchived;
  }

  match(personalChat: PersonalChat): boolean {
    return this.isArchived === personalChat.isArchived();
  }
}

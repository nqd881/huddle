import {
  Aggregate,
  Id,
  ModelType,
  SnowflakeGenerator,
  aggregate,
  id,
} from "ddd-node";
import { Item } from "../item/item";
import { FolderCreated } from "./events/folder-created";
import { FolderRenamed } from "./events/folder-renamed";
import { PersonalChat } from "../personal-chat/personal-chat";
import { Selection } from "./selection";
import { CriterionType, ICriterion } from "./criterion";

export enum MovingDirection {
  Up,
  Down,
}

export interface FolderProps {
  readonly ownerUserId: Id;
  name: string;
  includeSelection: Selection;
  excludeSelection: Selection;
}

export type CreateFolderProps = {
  ownerUserId: Id;
  name: string;
  includeSelectionCriteria?: ICriterion[];
  excludeSelectionCriteria?: ICriterion[];
};

@id(new SnowflakeGenerator())
@aggregate()
export class Folder extends Aggregate<FolderProps> {
  static create(props: CreateFolderProps) {
    const {
      ownerUserId,
      name,
      includeSelectionCriteria,
      excludeSelectionCriteria,
    } = props;

    const includeSelection = Selection.newSelection(includeSelectionCriteria);

    const excludeSelection = Selection.newSelection(excludeSelectionCriteria);

    const newFolder = Folder.newAggregate({
      ownerUserId,
      name,
      includeSelection,
      excludeSelection,
    });

    newFolder.recordEvent(FolderCreated, { name, ownerUserId });

    return newFolder;
  }

  getOwnerUserId() {
    return this._props.ownerUserId;
  }

  getName() {
    return this._props.name;
  }

  getIncludeSelection() {
    return this._props.includeSelection;
  }

  getExcludeSelection() {
    return this._props.excludeSelection;
  }

  rename(name: string) {
    this._props.name = name;

    this.recordEvent(FolderRenamed, { name });
  }

  createItem(personalChatId: Id) {
    const newItem = Item.create({
      folderId: this._id,
      personalChatId,
    });

    return newItem;
  }

  setIncludeCriterion(criterion: ICriterion) {
    this._props.includeSelection.setCriterion(criterion);
  }

  removeIncludeCriterion(criterionType: CriterionType) {
    this._props.includeSelection.removeCriterion(criterionType);
  }

  setExcludeCriterion(criterion: ICriterion) {
    this._props.excludeSelection.setCriterion(criterion);
  }

  removeExcludeCriterion(criterionType: CriterionType) {
    this._props.excludeSelection.removeCriterion(criterionType);
  }

  isPersonalChatEligible(personalChat: PersonalChat) {
    return (
      this.getIncludeSelection().matchesAnyCriteria(personalChat) &&
      !this.getExcludeSelection().matchesAnyCriteria(personalChat)
    );
  }
}

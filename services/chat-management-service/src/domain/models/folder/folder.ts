import { Aggregate, Id, ModelType, aggregate } from "ddd-node";
import { Item } from "../item/item";
import { FolderCreated } from "./events/folder-created";
import { FolderRenamed } from "./events/folder-renamed";
import { ItemPinnedToFolder } from "./events/item-pinned-to-folder";
import { ItemUnpinnedFromFolder } from "./events/item-unpinned-from-folder";
import { PinnedItemMoved } from "./events/pinned-item-moved";
import { PinnedItem } from "./pinned-item";
import { Position } from "./position";
import { AnySelection, Selection } from "./selection";
import { PersonalChat } from "../personal-chat/personal-chat";
import { SelectionList } from "./selection-list";

export enum MovingDirection {
  Up,
  Down,
}

export interface FolderProps {
  readonly ownerUserId: Id;
  name: string;
  includedSelections: SelectionList;
  excludedSelections: SelectionList;
  pinnedItems: PinnedItem[];
}

export type CreateFolderProps = Omit<FolderProps, "pinnedItems">;

@aggregate()
export class Folder extends Aggregate<FolderProps> {
  static create(props: CreateFolderProps) {
    const { ownerUserId, name, includedSelections, excludedSelections } = props;

    const newFolder = Folder.newAggregate({
      ownerUserId,
      name,
      includedSelections,
      excludedSelections,
      pinnedItems: [],
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

  getIncludedSelections() {
    return this._props.includedSelections.getSelections();
  }

  getExcludedSelections() {
    return this._props.excludedSelections.getSelections();
  }

  getPinnedItems() {
    return this._props.pinnedItems;
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

  private findPinnedItem(itemId: Id) {
    return this._props.pinnedItems.find((pinnedItem) =>
      pinnedItem.itemId.equals(itemId)
    );
  }

  private getPinnedItem(itemId: Id) {
    const pinnedItem = this.findPinnedItem(itemId);

    if (!pinnedItem) throw new Error();

    return pinnedItem;
  }

  private hasPinnedItem(itemId: Id) {
    return Boolean(this.findPinnedItem(itemId));
  }

  pinItem(itemId: Id) {
    if (this.hasPinnedItem(itemId)) throw new Error();

    const targetItem = PinnedItem.newEntity({
      itemId,
      position: new Position({ value: 0 }),
    });

    this._props.pinnedItems.forEach((pinnedItem) => pinnedItem.moveDown(1));

    this._props.pinnedItems.unshift(targetItem);

    this.recordEvent(ItemPinnedToFolder, {
      folderId: this._id,
      itemId,
    });
  }

  unpinItem(itemId: Id) {
    const targetItem = this.getPinnedItem(itemId)!;

    this._props.pinnedItems = this._props.pinnedItems.filter(
      (pinnedItem) => !pinnedItem.itemId.equals(itemId)
    );

    this._props.pinnedItems.forEach((pinnedItem) => {
      if (pinnedItem.isLowerThan(targetItem)) pinnedItem.moveUp(1);
    });

    this.recordEvent(ItemUnpinnedFromFolder, {
      folderId: this._id,
      itemId,
    });
  }

  private validatePositionIsInRange(position: Position) {
    return this._props.pinnedItems.some((pinnedItem) =>
      pinnedItem.isPositionedAt(position)
    );
  }

  movePinnedItem(itemId: Id, destPosition: Position) {
    this.validatePositionIsInRange(destPosition);

    const targetItem = this.getPinnedItem(itemId);

    if (targetItem.isPositionedAt(destPosition)) throw new Error();

    const direction = targetItem.isHigherThanPosition(destPosition)
      ? MovingDirection.Down
      : targetItem.isLowerThanPosition(destPosition)
      ? MovingDirection.Up
      : null;

    if (!direction) throw new Error();

    this._props.pinnedItems.forEach((item) => {
      if (direction === MovingDirection.Down) {
        if (
          item.isLowerThan(targetItem) &&
          !item.isLowerThanPosition(destPosition)
        )
          item.moveUp(1);
      } else {
        if (
          item.isHigherThan(targetItem) &&
          !item.isHigherThanPosition(destPosition)
        )
          item.moveDown(1);
      }
    });

    targetItem.moveTo(destPosition);

    this.recordEvent(PinnedItemMoved, {
      folderId: this._id,
      itemId,
      destPosition: destPosition.value,
    });
  }

  setIncludedSelections(selections: AnySelection[]) {
    selections.forEach((selection) =>
      this._props.includedSelections.setSelection(selection)
    );
  }

  setExcludedSelections(selections: AnySelection[]) {
    selections.forEach((selection) =>
      this._props.excludedSelections.setSelection(selection)
    );
  }

  removeIncludedSelections(selectionTypes: string[]) {
    selectionTypes.forEach((selectionType) =>
      this._props.includedSelections.removeSelection(selectionType)
    );
  }

  removeExcludedSelections(selectionTypes: string[]) {
    selectionTypes.forEach((selectionType) =>
      this._props.excludedSelections.removeSelection(selectionType)
    );
  }

  shouldPersonalChatBelongsToThisFolder(personalChat: PersonalChat) {
    if (!this.getOwnerUserId().equals(personalChat.getOwnerUserId()))
      throw new Error();

    return (
      this._props.includedSelections.isPersonalChatSelected(personalChat) &&
      !this._props.excludedSelections.isPersonalChatSelected(personalChat)
    );
  }
}

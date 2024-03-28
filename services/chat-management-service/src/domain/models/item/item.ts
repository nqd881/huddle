import { Aggregate, Id, aggregate } from "ddd-node";
import { ItemCreated } from "./events/item-created";
import { ItemMovedToTop } from "./events/item-moved-to-top";
import { ItemPinned } from "./events/item-pinned";
import { ItemUnpinned } from "./events/item-unpinned";

export interface ItemProps {
  readonly folderId: Id;
  readonly personalChatId: Id;
  pinned: boolean;
  pinnedDate?: Date;
  movedDate?: Date;
}

export type CreateItemProps = {
  folderId: Id;
  personalChatId: Id;
};

@aggregate()
export class Item extends Aggregate<ItemProps> {
  static create(props: CreateItemProps) {
    const { folderId, personalChatId } = props;

    const item = Item.newAggregate({
      folderId,
      personalChatId,
      pinned: false,
    });

    item.recordEvent(ItemCreated, {
      folderId,
      personalChatId,
    });

    return item;
  }

  getFolderId() {
    return this._props.folderId;
  }

  getPersonalChatId() {
    return this._props.personalChatId;
  }

  isPinned() {
    return this._props.pinned;
  }

  getPinnedDate() {
    return this._props.pinnedDate;
  }

  getMovedDate() {
    return this._props.movedDate;
  }

  pin() {
    if (this.isPinned()) throw new Error();

    this._props.pinned = true;
    this._props.pinnedDate = new Date();

    this.recordEvent(ItemPinned, { pinnedDate: this.getPinnedDate()! });
  }

  unpin() {
    if (!this.isPinned()) throw new Error();

    this._props.pinned = false;
    this._props.pinnedDate = undefined;
    this._props.movedDate = undefined;

    this.recordEvent(ItemUnpinned, {});
  }

  moveToTop() {
    if (!this.isPinned()) throw new Error();

    this._props.movedDate = new Date();

    this.recordEvent(ItemMovedToTop, { movedDate: this.getMovedDate()! });
  }
}

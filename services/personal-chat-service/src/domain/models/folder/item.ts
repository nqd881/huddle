import { EntityBase, Id, Prop } from "ddd-node";

export interface ItemProps {
  readonly chatId: Id;
  pinned: boolean;
  pinnedDate?: Date;
}

export class Item extends EntityBase<ItemProps> {
  @Prop()
  declare chatId: Id;

  @Prop()
  declare pinned: boolean;

  @Prop()
  declare pinnedDate: Date;

  pin() {
    this._props.pinned = true;
    this._props.pinnedDate = new Date();
  }

  unpin() {
    if (!this.pinned) return;

    this._props.pinned = false;
    this._props.pinnedDate = undefined;
  }
}

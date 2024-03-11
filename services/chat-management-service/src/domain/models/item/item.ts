import { Aggregate, Id, aggregate } from "ddd-node";
import { ItemCreated } from "./events/item-created";

export interface ItemProps {
  readonly folderId: Id;
  readonly personalChatId: Id;
}

@aggregate()
export class Item extends Aggregate<ItemProps> {
  static create(props: ItemProps) {
    const { folderId, personalChatId } = props;

    const item = Item.newAggregate({
      folderId,
      personalChatId,
    });

    item.recordEvent(ItemCreated, {
      folderId,
      personalChatId,
    });

    return item;
  }

  get folderId() {
    return this._props.folderId;
  }

  get personalChatId() {
    return this._props.personalChatId;
  }
}

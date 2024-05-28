import { Id, Prop, ValueObjectBase } from "ddd-node";

export interface PinnedItemProps {
  folderId: Id;
  chatId: Id;
  pinnedDate: Date;
}

export class PinnedItem extends ValueObjectBase<PinnedItemProps> {
  @Prop()
  declare folderId: Id;

  @Prop()
  declare chatId: Id;

  @Prop()
  declare pinnedDate: Date;
}

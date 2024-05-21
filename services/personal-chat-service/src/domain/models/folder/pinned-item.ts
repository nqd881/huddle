import { Id, Prop, ValueObjectBase } from "ddd-node";

export interface PinnedItemProps {
  folderId: Id;
  chatId: Id;
  pinnedDate: Date;
}

export class PinnedItem extends ValueObjectBase<PinnedItemProps> {
  @Prop()
  folderId: Id;

  @Prop()
  chatId: Id;

  @Prop()
  pinnedDate: Date;
}

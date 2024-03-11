import { Event, Id, event } from "ddd-node";

export interface ItemUnpinnedFromFolderProps {
  folderId: Id;
  itemId: Id;
}

@event()
export class ItemUnpinnedFromFolder extends Event<ItemUnpinnedFromFolderProps> {}

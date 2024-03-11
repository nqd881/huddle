import { Event, Id, event } from "ddd-node";

export interface ItemPinnedToFolderProps {
  folderId: Id;
  itemId: Id;
}

@event()
export class ItemPinnedToFolder extends Event<ItemPinnedToFolderProps> {}

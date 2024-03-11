import { Event, Id, event } from "ddd-node";

export interface PinnedItemMovedProps {
  folderId: Id;
  itemId: Id;
  destPosition: number;
}

@event()
export class PinnedItemMoved extends Event<PinnedItemMovedProps> {}

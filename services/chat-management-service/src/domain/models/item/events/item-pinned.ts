import { Event, event } from "ddd-node";

export interface ItemPinnedProps {
  pinnedDate: Date;
}

@event()
export class ItemPinned extends Event<ItemPinnedProps> {}

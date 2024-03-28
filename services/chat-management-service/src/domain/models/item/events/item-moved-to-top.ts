import { Event, event } from "ddd-node";

export interface ItemMovedToTopProps {
  movedDate: Date;
}

@event()
export class ItemMovedToTop extends Event<ItemMovedToTopProps> {}

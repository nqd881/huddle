import { EmptyProps, Event, event } from "ddd-node";

@event()
export class ItemUnpinned extends Event<EmptyProps> {}

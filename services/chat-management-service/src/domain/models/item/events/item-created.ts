import { Event, Id, event } from "ddd-node";

export interface ItemCreatedProps {
  folderId: Id;
  personalChatId: Id;
}

@event()
export class ItemCreated extends Event<ItemCreatedProps> {}

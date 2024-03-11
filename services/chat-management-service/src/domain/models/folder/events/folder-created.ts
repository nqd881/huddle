import { Event, Id, event } from "ddd-node";

export interface FolderCreatedProps {
  ownerUserId: Id;
  name: string;
}

@event()
export class FolderCreated extends Event<FolderCreatedProps> {}

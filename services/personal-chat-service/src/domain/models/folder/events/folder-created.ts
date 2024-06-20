import { Event, EventBase, Id } from "ddd-node";

export interface FolderCreatedProps {
  ownerUserId: Id;
  name: string;
}

@Event("FOLDER_CREATED")
export class FolderCreated extends EventBase<FolderCreatedProps> {}

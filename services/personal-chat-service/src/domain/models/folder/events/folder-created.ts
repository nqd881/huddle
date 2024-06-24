import { Event, EventBase, Id, Model } from "ddd-node";

export interface FolderCreatedProps {
  ownerUserId: Id;
  name: string;
}

@Event("FOLDER_CREATED")
@Model({ version: 0 })
export class FolderCreated extends EventBase<FolderCreatedProps> {}

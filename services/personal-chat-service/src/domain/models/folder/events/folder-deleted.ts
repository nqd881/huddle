import { Event, EventBase } from "ddd-node";

export interface FolderDeletedProps {}

@Event("FOLDER_DELETED")
export class FolderDeleted extends EventBase<FolderDeletedProps> {}

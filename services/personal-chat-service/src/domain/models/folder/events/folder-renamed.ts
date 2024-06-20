import { Event, EventBase } from "ddd-node";

export interface FolderRenamedProps {
  name: string;
}

@Event("FOLDER_RENAMED")
export class FolderRenamed extends EventBase<FolderRenamedProps> {}

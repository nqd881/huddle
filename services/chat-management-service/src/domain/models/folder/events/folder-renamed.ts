import { Event, event } from "ddd-node";

export interface FolderRenamedProps {
  name: string;
}

@event()
export class FolderRenamed extends Event<FolderRenamedProps> {}

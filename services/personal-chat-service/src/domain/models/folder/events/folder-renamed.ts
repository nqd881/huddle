import { EventBase } from "ddd-node";

export interface FolderRenamedProps {
  name: string;
}

export class FolderRenamed extends EventBase<FolderRenamedProps> {}

import { EventBase, Id } from "ddd-node";

export interface FolderCreatedProps {
  ownerUserId: Id;
  name: string;
}

export class FolderCreated extends EventBase<FolderCreatedProps> {}

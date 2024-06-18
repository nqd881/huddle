import { IRepository, Id } from "ddd-node";
import { Folder } from "../models/folder/folder";
import { FolderStatus } from "../models/folder/folder-status";
import { ChatIdFilter } from "../models/folder/folder-filter/chat-id-filter";
import { ChatMutedFilter } from "../models/folder/folder-filter/chat-muted-filter";

export interface IFolderRepo extends IRepository<Folder> {
  delete(id: Id): Promise<void>;

  getFolderStatus(folderId: Id): Promise<FolderStatus | null>;

  getIdFilter(folderId: Id): Promise<ChatIdFilter | null>;
  getMutedFilter(folderId: Id): Promise<ChatMutedFilter | null>;
}

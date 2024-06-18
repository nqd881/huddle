import { IRepository, Id } from "ddd-node";
import { FolderItem } from "../models/folder-item/folder-item";

export interface IFolderItemRepo extends IRepository<FolderItem> {
  findInFolder(folderId: Id, chatId: Id): Promise<FolderItem | null>;
}

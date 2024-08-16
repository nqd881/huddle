import { IRepository, Id } from "ddd-node";
import { Folder } from "../models/folder/folder";

export interface IFolderRepo extends IRepository<Folder> {
  delete(id: Id): Promise<void>;
  folderOfId(id: Id): Promise<Folder | null>;

  allFoldersOfUser(userId: Id): Promise<Folder[]>;
}

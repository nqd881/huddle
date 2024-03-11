import { IRepository } from "ddd-node";
import { Folder } from "../models/folder/folder";

export interface IFolderRepo extends IRepository<Folder> {}

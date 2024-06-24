import { Domain } from "ddd-node";
import { IFolderRepo } from "./repositories/folder.repo";
import { IPersonalChatRepo } from "./repositories/personal-chat.repo";
import { IFolderItemRepo } from "./repositories/folder-item.repo";

export const domain = new Domain("PersonalChat");

export interface IDomainRegistry {
  folderRepo(): IFolderRepo;

  personalChatRepo(): IPersonalChatRepo;

  folderItemRepo(): IFolderItemRepo;
}

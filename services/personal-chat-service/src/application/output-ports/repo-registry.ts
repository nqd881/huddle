import { IFolderRepo } from "../../domain/repositories/folder.repo";
import { IPersonalChatRepo } from "../../domain/repositories/personal-chat.repo";
import { IUserRepo } from "../../domain/repositories/user.repo";

export interface IRepoRegistry {
  userRepo(): IUserRepo;

  folderRepo(): IFolderRepo;

  personalChatRepo(): IPersonalChatRepo;
}

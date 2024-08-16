import { Inject, Injectable } from "@nestjs/common";
import { IRepoRegistry } from "../../../application/output-ports/repo-registry";
import { IFolderRepo } from "../../../domain/repositories/folder.repo";
import { IPersonalChatRepo } from "../../../domain/repositories/personal-chat.repo";
import { IUserRepo } from "../../../domain/repositories/user.repo";
import { FOLDER_REPO } from "../repositories/folder-repo";
import { PERSONAL_CHAT_REPO } from "../repositories/personal-chat-repo";
import { USER_REPO } from "../repositories/user-repo/token";

@Injectable()
export class RepoRegistry implements IRepoRegistry {
  constructor(
    @Inject(USER_REPO) private _userRepo: IUserRepo,
    @Inject(FOLDER_REPO) private _folderRepo: IFolderRepo,
    @Inject(PERSONAL_CHAT_REPO) private _personalChatRepo: IPersonalChatRepo
  ) {}

  userRepo(): IUserRepo {
    return this._userRepo;
  }

  folderRepo(): IFolderRepo {
    return this._folderRepo;
  }

  personalChatRepo(): IPersonalChatRepo {
    return this._personalChatRepo;
  }
}

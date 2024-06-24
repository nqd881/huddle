import { Inject, Injectable } from "@nestjs/common";
import { IDomainRegistry } from "../../../domain/domain";
import { IFolderItemRepo } from "../../../domain/repositories/folder-item.repo";
import { IFolderRepo } from "../../../domain/repositories/folder.repo";
import { IPersonalChatRepo } from "../../../domain/repositories/personal-chat.repo";
import { FOLDER_ITEM_REPO } from "../repositories/folder-item-repo";
import { FOLDER_REPO } from "../repositories/folder-repo";
import { PERSONAL_CHAT_REPO } from "../repositories/personal-chat-repo";

@Injectable()
export class DomainRegistry implements IDomainRegistry {
  constructor(
    @Inject(FOLDER_REPO) private _folderRepo: IFolderRepo,
    @Inject(FOLDER_ITEM_REPO) private _folderItemRepo: IFolderItemRepo,
    @Inject(PERSONAL_CHAT_REPO) private _personalChatRepo: IPersonalChatRepo
  ) {}

  folderRepo(): IFolderRepo {
    return this._folderRepo;
  }

  folderItemRepo(): IFolderItemRepo {
    return this._folderItemRepo;
  }

  personalChatRepo(): IPersonalChatRepo {
    return this._personalChatRepo;
  }
}

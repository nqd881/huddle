import { Inject, Injectable } from "@nestjs/common";
import { Repository } from "./token";
import { IPersonalChatRepo } from "../../../domain/repositories/personal-chat.repo";
import { IFolderRepo } from "../../../domain/repositories/folder.repo";

@Injectable()
export class RepositoryService {
  constructor(
    @Inject(Repository.PersonalChat)
    public readonly personalChatRepo: IPersonalChatRepo,
    @Inject(Repository.Folder)
    public readonly folderRepo: IFolderRepo
  ) {}
}

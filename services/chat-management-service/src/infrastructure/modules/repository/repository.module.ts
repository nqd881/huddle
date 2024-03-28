import { Global, Module } from "@nestjs/common";
import { FolderRepo } from "./folder-repo/folder-repo";
import { FolderRepoModule } from "./folder-repo/folder-repo.module";
import { PersonalChatRepo } from "./personal-chat-repo/personal-chat-repo";
import { PersonalChatRepoModule } from "./personal-chat-repo/personal-chat-repo.module";
import { Repository } from "./token";
import { ItemRepo } from "./item-repo/item-repo";
import { ItemRepoModule } from "./item-repo/item-repo.module";

@Global()
@Module({
  imports: [PersonalChatRepoModule, FolderRepoModule, ItemRepoModule],
  providers: [
    { provide: Repository.PersonalChat, useExisting: PersonalChatRepo },
    { provide: Repository.Folder, useExisting: FolderRepo },
    { provide: Repository.Item, useExisting: ItemRepo },
  ],
  exports: [Repository.PersonalChat, Repository.Folder, Repository.Item],
})
export class RepositoryModule {}

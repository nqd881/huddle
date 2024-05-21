import { Global, Module } from "@nestjs/common";
import { FolderRepo } from "./folder-repo/folder-repo";
import { FolderRepoModule } from "./folder-repo/folder-repo.module";
import { PersonalChatRepo } from "./personal-chat-repo/personal-chat-repo";
import { PersonalChatRepoModule } from "./personal-chat-repo/personal-chat-repo.module";
import { Repository } from "./token";
import { RepositoryService } from "./repository.service";

@Global()
@Module({
  imports: [PersonalChatRepoModule, FolderRepoModule],
  providers: [
    RepositoryService,
    { provide: Repository.PersonalChat, useExisting: PersonalChatRepo },
    { provide: Repository.Folder, useExisting: FolderRepo },
  ],
  exports: [RepositoryService],
})
export class RepositoryModule {}

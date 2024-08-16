import { Global, Module } from "@nestjs/common";
import { RepoRegistry } from "./repo-registry";
import { PersonalChatRepoModule } from "../repositories/personal-chat-repo/personal-chat-repo.module";
import { FolderRepoModule } from "../repositories/folder-repo";
import { UserRepoModule } from "../repositories/user-repo";

@Global()
@Module({
  imports: [UserRepoModule, FolderRepoModule, PersonalChatRepoModule],
  providers: [RepoRegistry],
  exports: [RepoRegistry],
})
export class RepoRegistryModule {}

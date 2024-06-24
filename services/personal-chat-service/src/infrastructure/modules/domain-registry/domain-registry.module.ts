import { Global, Module } from "@nestjs/common";
import { DomainRegistry } from "./domain-registry";
import { PersonalChatRepoModule } from "../repositories/personal-chat-repo/personal-chat-repo.module";
import { FolderRepoModule } from "../repositories/folder-repo";
import { FolderItemRepoModule } from "../repositories/folder-item-repo";

@Global()
@Module({
  imports: [FolderRepoModule, FolderItemRepoModule, PersonalChatRepoModule],
  providers: [DomainRegistry],
  exports: [DomainRegistry],
})
export class DomainRegistryModule {}

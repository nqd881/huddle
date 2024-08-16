import { IEventSubscriber } from "ddd-node";
import { inject, injectable } from "inversify";
import { FolderFilterUpdated } from "../../domain/models/folder/events/folder-filter-updated";
import { RepoRegistryToken } from "../app.token";
import { IRepoRegistry } from "../output-ports/repo-registry";

@injectable()
export class SyncFolderWhenFiltersUpdated
  implements IEventSubscriber<FolderFilterUpdated>
{
  constructor(@inject(RepoRegistryToken) private repoRegistry: IRepoRegistry) {}

  subscribeToEvents() {
    return FolderFilterUpdated;
  }

  async handleEvent(event: FolderFilterUpdated): Promise<void> {
    const folderId = event.source().aggregateId;

    const folder = await this.repoRegistry.folderRepo().folderOfId(folderId);

    if (!folder) throw new Error("Folder not found");

    const chatDescriptors = await this.repoRegistry
      .personalChatRepo()
      .allChatDescriptorsOfUser(folder.ownerUserId);

    folder.sync(chatDescriptors);

    await this.repoRegistry.folderRepo().save(folder);
  }
}

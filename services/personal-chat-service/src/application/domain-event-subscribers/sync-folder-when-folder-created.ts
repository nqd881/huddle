import { IEventSubscriber } from "ddd-node";
import { inject, injectable } from "inversify";
import { UserCreatedFolder } from "../../domain/models/user/events/user-created-folder";
import { RepoRegistryToken } from "../app.token";
import { IRepoRegistry } from "../output-ports/repo-registry";

@injectable()
export class SyncFolderWhenFolderCreated
  implements IEventSubscriber<UserCreatedFolder>
{
  constructor(@inject(RepoRegistryToken) private repoRegistry: IRepoRegistry) {}

  subscribeToEvents() {
    return UserCreatedFolder;
  }

  async handleEvent(event: UserCreatedFolder): Promise<void> {
    console.log("Syncning folder when user created folder...");
    console.log("Event", event);

    const { userId, folderId } = event.props();

    const folder = await this.repoRegistry.folderRepo().folderOfId(folderId);

    if (!folder) throw new Error("Folder not found");

    const chatDescriptors = await this.repoRegistry
      .personalChatRepo()
      .allChatDescriptorsOfUser(userId);

    folder.sync(chatDescriptors);

    await this.repoRegistry.folderRepo().save(folder);
  }
}

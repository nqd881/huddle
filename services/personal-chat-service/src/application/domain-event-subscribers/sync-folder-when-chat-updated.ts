import { IEventSubscriber } from "ddd-node";
import { inject, injectable } from "inversify";
import { ChatDescriptor } from "../../domain/models/personal-chat/chat-descriptor";
import {
  PersonalChatArchived,
  PersonalChatUnarchived,
} from "../../domain/models/personal-chat/events";
import { RepoRegistryToken } from "../app.token";
import { IRepoRegistry } from "../output-ports/repo-registry";

@injectable()
export class SyncFolderWhenChatUpdated
  implements IEventSubscriber<PersonalChatArchived | PersonalChatUnarchived>
{
  constructor(@inject(RepoRegistryToken) private repoRegistry: IRepoRegistry) {}

  subscribeToEvents() {
    return [PersonalChatArchived, PersonalChatUnarchived];
  }

  async handleEvent(
    event: PersonalChatArchived | PersonalChatUnarchived
  ): Promise<void> {
    let chatDescriptor: ChatDescriptor;

    switch (true) {
      case event instanceof PersonalChatArchived: {
        chatDescriptor = new ChatDescriptor({
          chatId: event.source().aggregateId,
          isArchived: true,
        });

        break;
      }
      case event instanceof PersonalChatUnarchived: {
        chatDescriptor = new ChatDescriptor({
          chatId: event.source().aggregateId,
          isArchived: false,
        });
      }
      default: {
        break;
      }
    }

    const folders = await this.repoRegistry
      .folderRepo()
      .allFoldersOfUser(event.props().userId);

    folders.forEach((folder) => folder.sync([chatDescriptor]));

    await Promise.all(
      folders.map((folder) => this.repoRegistry.folderRepo().save(folder))
    );
  }
}

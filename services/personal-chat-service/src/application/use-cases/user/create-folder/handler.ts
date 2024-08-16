import { inject, injectable } from "inversify";
import { FolderFilter } from "../../../../domain/models/folder/folder-filter/folder-filter";
import { ChatTypeBuilder } from "../../../../domain/models/personal-chat/chat-type";
import { RepoRegistryToken } from "../../../app.token";
import { IAppCommandHandler } from "../../../base";
import { IRepoRegistry } from "../../../output-ports/repo-registry";
import { Type } from "../../../utils/type";
import { CreateFolderCommand } from "./command";

@injectable()
export class CreateFolderHandler
  implements IAppCommandHandler<CreateFolderCommand>
{
  constructor(@inject(RepoRegistryToken) private repoRegistry: IRepoRegistry) {}

  commandType(): Type<CreateFolderCommand> {
    return CreateFolderCommand;
  }

  async handleCommand(command: CreateFolderCommand): Promise<void> {
    const { userId } = command;

    if (!userId) throw new Error();

    const user = await this.repoRegistry.userRepo().userOfId(userId);

    if (!user) throw new Error("User not found");

    const { name, filter } = command.payload;

    const { includedIds, excludedIds, archived, muted, read, type } =
      filter ?? {};

    const folder = user.createFolder({
      name,
      filter: new FolderFilter({
        includedIds,
        excludedIds,
        archived,
        muted,
        read,
        type: type ? ChatTypeBuilder().withValue(type).build() : undefined,
      }),
    });

    const chatDescriptors = await this.repoRegistry
      .personalChatRepo()
      .allChatDescriptorsOfUser(userId);

    folder.sync(chatDescriptors);

    await this.repoRegistry.userRepo().save(user);
    await this.repoRegistry.folderRepo().save(folder);
  }
}

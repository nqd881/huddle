import { UnpinChatCommand } from ".";
import { IRepoRegistry } from "../../../output-ports/repo-registry";
import { IAppCommandHandler } from "../../../base/app-command";
import { Type } from "../../../utils/type";
import { inject, injectable } from "inversify";
import { RepoRegistryToken } from "../../../app.token";

@injectable()
export class UnpinChatHandler implements IAppCommandHandler<UnpinChatCommand> {
  constructor(
    @inject(RepoRegistryToken)
    private readonly repoRegistry: IRepoRegistry
  ) {}

  commandType(): Type<UnpinChatCommand> {
    return UnpinChatCommand;
  }

  async handleCommand(command: UnpinChatCommand): Promise<any> {
    const { folderId, chatId } = command.payload;

    const folder = await this.repoRegistry.folderRepo().folderOfId(folderId);

    if (!folder) throw new Error();

    folder.unpinChat(chatId);

    await this.repoRegistry.folderRepo().save(folder);
  }
}

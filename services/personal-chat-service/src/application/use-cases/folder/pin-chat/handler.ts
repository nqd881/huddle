import { PinChatCommand } from ".";
import { IAppCommandHandler } from "../../../base/app-command";
import { Type } from "../../../utils/type";
import { inject, injectable } from "inversify";
import { RepoRegistryToken } from "../../../app.token";
import { IRepoRegistry } from "../../../output-ports/repo-registry";

@injectable()
export class PinChatHandler implements IAppCommandHandler<PinChatCommand> {
  constructor(
    @inject(RepoRegistryToken)
    private readonly repoRegistry: IRepoRegistry
  ) {}

  commandType(): Type<PinChatCommand> {
    return PinChatCommand;
  }

  async handleCommand(command: PinChatCommand) {
    const { folderId, chatId } = command.payload;

    const folder = await this.repoRegistry.folderRepo().folderOfId(folderId);

    if (!folder) throw new Error();

    folder.pinChat(chatId);

    await this.repoRegistry.folderRepo().save(folder);
  }
}

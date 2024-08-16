import { inject, injectable } from "inversify";
import { UnarchivePersonalChatCommand } from ".";
import { RepoRegistryToken } from "../../../app.token";
import { IAppCommandHandler } from "../../../base/app-command";
import { IRepoRegistry } from "../../../output-ports/repo-registry";
import { Type } from "../../../utils/type";
import { PersonalChatNotFoundError } from "../_errors/personal-chat-not-found";

@injectable()
export class UnarchivePersonalChatHandler
  implements IAppCommandHandler<UnarchivePersonalChatCommand>
{
  constructor(
    @inject(RepoRegistryToken) private readonly repoRegistry: IRepoRegistry
  ) {}

  commandType(): Type<UnarchivePersonalChatCommand> {
    return UnarchivePersonalChatCommand;
  }

  async handleCommand(command: UnarchivePersonalChatCommand): Promise<any> {
    const { personalChatId } = command.payload;

    const personalChat = await this.repoRegistry
      .personalChatRepo()
      .findById(personalChatId);

    if (!personalChat) throw new PersonalChatNotFoundError(personalChatId);

    personalChat.unarchive();

    return this.repoRegistry.personalChatRepo().save(personalChat);
  }
}

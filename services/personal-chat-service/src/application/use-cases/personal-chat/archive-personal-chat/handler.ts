import { inject, injectable } from "inversify";
import { RepoRegistryToken } from "../../../app.token";
import { IAppCommandHandler } from "../../../base/app-command";
import { IRepoRegistry } from "../../../output-ports/repo-registry";
import { Type } from "../../../utils/type";
import { PersonalChatNotFoundError } from "../_errors/personal-chat-not-found";
import { ArchivePersonalChatCommand } from "./command";

@injectable()
export class ArchivePersonalChatHandler
  implements IAppCommandHandler<ArchivePersonalChatCommand>
{
  constructor(
    @inject(RepoRegistryToken) private readonly repoRegistry: IRepoRegistry
  ) {}

  commandType(): Type<ArchivePersonalChatCommand> {
    return ArchivePersonalChatCommand;
  }

  async handleCommand(command: ArchivePersonalChatCommand): Promise<any> {
    const { personalChatId } = command.payload;

    const personalChat = await this.repoRegistry
      .personalChatRepo()
      .findById(personalChatId);

    if (!personalChat) throw new PersonalChatNotFoundError(personalChatId);

    personalChat.archive();

    return this.repoRegistry.personalChatRepo().save(personalChat);
  }
}

import { inject, injectable } from "inversify";
import {
  ReadingStatus,
  ReadingStatusMarker,
} from "../../../../domain/models/personal-chat/reading-status-marker";
import { RepoRegistryToken } from "../../../app.token";
import { IAppCommandHandler } from "../../../base/app-command";
import { IRepoRegistry } from "../../../output-ports/repo-registry";
import { Type } from "../../../utils/type";
import { PersonalChatNotFoundError } from "../_errors/personal-chat-not-found";
import { MarkPersonalChatAsReadCommand } from "./command";

@injectable()
export class MarkPersonalChatAsReadHandler
  implements IAppCommandHandler<MarkPersonalChatAsReadCommand>
{
  constructor(
    @inject(RepoRegistryToken) private readonly repoRegistry: IRepoRegistry
  ) {}

  commandType(): Type<MarkPersonalChatAsReadCommand> {
    return MarkPersonalChatAsReadCommand;
  }

  async handleCommand(command: MarkPersonalChatAsReadCommand) {
    const { personalChatId } = command.payload;

    const personalChat = await this.repoRegistry
      .personalChatRepo()
      .findById(personalChatId);

    if (!personalChat) throw new PersonalChatNotFoundError(personalChatId);

    personalChat.mark(ReadingStatusMarker.newMarker(ReadingStatus.Read));

    return this.repoRegistry.personalChatRepo().save(personalChat);
  }
}

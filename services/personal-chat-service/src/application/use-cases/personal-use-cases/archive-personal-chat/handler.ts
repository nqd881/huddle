import { Id } from "ddd-node";
import { IDomainRegistry } from "../../../../domain/domain";
import { IAppCommandHandler } from "../../../base/app-command";
import { Type } from "../../../utils/type";
import { PersonalChatNotFoundError } from "../_errors/personal-chat-not-found";
import { ArchivePersonalChatCommand } from "./command";

export class ArchivePersonalChatHandler
  implements IAppCommandHandler<ArchivePersonalChatCommand>
{
  constructor(private readonly domainRegistry: IDomainRegistry) {}

  commandType(): Type<ArchivePersonalChatCommand> {
    return ArchivePersonalChatCommand;
  }

  async handleCommand(command: ArchivePersonalChatCommand): Promise<any> {
    const { payload } = command;

    const personalChatId = new Id(payload.personalChatId);

    const personalChat = await this.domainRegistry
      .personalChatRepo()
      .findById(personalChatId);

    if (!personalChat) throw new PersonalChatNotFoundError(personalChatId);

    personalChat.archive();

    return this.domainRegistry.personalChatRepo().save(personalChat);
  }
}

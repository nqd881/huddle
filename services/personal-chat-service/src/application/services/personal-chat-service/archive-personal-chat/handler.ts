import { Id } from "ddd-node";
import { IPersonalChatRepo } from "../../../../domain/repositories/personal-chat.repo";
import { PersonalChatNotFoundError } from "../_errors/personal-chat-not-found";
import { ArchivePersonalChatCommand } from "./command";
import { Type } from "../../../utils/type";
import { IAppCommandHandler } from "../../../base/app-command";

export class ArchivePersonalChatHandler
  implements IAppCommandHandler<ArchivePersonalChatCommand>
{
  constructor(private personalChatRepo: IPersonalChatRepo) {}

  commandType(): Type<ArchivePersonalChatCommand> {
    return ArchivePersonalChatCommand;
  }

  async handleCommand(command: ArchivePersonalChatCommand): Promise<any> {
    const { payload } = command;

    const personalChatId = new Id(payload.personalChatId);

    const personalChat = await this.personalChatRepo.findById(personalChatId);

    if (!personalChat) throw new PersonalChatNotFoundError(personalChatId);

    personalChat.archive();

    return this.personalChatRepo.save(personalChat);
  }
}

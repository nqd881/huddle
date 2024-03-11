import { Id } from "ddd-node";
import { IPersonalChatRepo } from "../../../../domain/repositories/personal-chat.repo";
import { PersonalChatNotFoundError } from "../_errors/personal-chat-not-found";
import { ArchivePersonalChatCommand } from "./command";
import { ICommandHandler } from "../../../interfaces";
import { Type } from "../../../interfaces/type";

export class ArchivePersonalChatHandler
  implements ICommandHandler<ArchivePersonalChatCommand>
{
  constructor(private personalChatRepo: IPersonalChatRepo) {}

  commandType(): Type<ArchivePersonalChatCommand> {
    return ArchivePersonalChatCommand;
  }

  async handleCommand(command: ArchivePersonalChatCommand): Promise<any> {
    const personalChatId = new Id(command.personalChatId);

    const personalChat = await this.personalChatRepo.findById(personalChatId);

    if (!personalChat) throw new PersonalChatNotFoundError(personalChatId);

    personalChat.archive();

    this.personalChatRepo.save(personalChat);
  }
}

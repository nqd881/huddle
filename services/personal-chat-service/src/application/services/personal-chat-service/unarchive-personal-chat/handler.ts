import { Id } from "ddd-node";
import { IPersonalChatRepo } from "../../../../domain/repositories/personal-chat.repo";
import { PersonalChatNotFoundError } from "../_errors/personal-chat-not-found";
import { UnarchivePersonChatCommand } from "./command";
import { ICommandHandler } from "../../../interfaces";
import { Type } from "../../../interfaces/type";

export class UnarchivePersonalChatHandler
  implements ICommandHandler<UnarchivePersonChatCommand>
{
  constructor(private personalChatRepo: IPersonalChatRepo) {}

  commandType(): Type<UnarchivePersonChatCommand> {
    return UnarchivePersonChatCommand;
  }

  async handleCommand(command: UnarchivePersonChatCommand): Promise<any> {
    const personalChatId = new Id(command.personalChatId);

    const personalChat = await this.personalChatRepo.findById(personalChatId);

    if (!personalChat) throw new PersonalChatNotFoundError(personalChatId);

    personalChat.unarchive();

    this.personalChatRepo.save(personalChat);
  }
}

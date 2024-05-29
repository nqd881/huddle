import { Id } from "ddd-node";
import { IPersonalChatRepo } from "../../../../domain/repositories/personal-chat.repo";
import { PersonalChatNotFoundError } from "../_errors/personal-chat-not-found";
import { Type } from "../../../utils/type";
import { IAppCommandHandler } from "../../../base/app-command";
import { UnarchivePersonalChatCommand } from ".";

export class UnarchivePersonalChatHandler
  implements IAppCommandHandler<UnarchivePersonalChatCommand>
{
  constructor(private personalChatRepo: IPersonalChatRepo) {}

  commandType(): Type<UnarchivePersonalChatCommand> {
    return UnarchivePersonalChatCommand;
  }

  async handleCommand(command: UnarchivePersonalChatCommand): Promise<any> {
    const { payload } = command;

    const personalChatId = new Id(payload.personalChatId);

    const personalChat = await this.personalChatRepo.findById(personalChatId);

    if (!personalChat) throw new PersonalChatNotFoundError(personalChatId);

    personalChat.unarchive();

    return this.personalChatRepo.save(personalChat);
  }
}

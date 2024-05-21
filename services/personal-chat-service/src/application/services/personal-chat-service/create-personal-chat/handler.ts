import { Id } from "ddd-node";
import { CreatePersonalChatCommand } from ".";
import { PersonalChat } from "../../../../domain/models/personal-chat/personal-chat";
import { IPersonalChatRepo } from "../../../../domain/repositories/personal-chat.repo";
import { ICommandHandler } from "../../../interfaces";
import { Type } from "../../../interfaces/type";

export class CreatePersonalChatHandler
  implements ICommandHandler<CreatePersonalChatCommand>
{
  constructor(private readonly personalChatRepo: IPersonalChatRepo) {}

  commandType(): Type<CreatePersonalChatCommand> {
    return CreatePersonalChatCommand;
  }

  async handleCommand(command: CreatePersonalChatCommand): Promise<any> {
    const sourceChatId = new Id(command.sourceChatId);
    const ownerUserId = new Id(command.ownerUserId);
    const type = command.type;

    const personalChat = PersonalChat.create({
      sourceChatId,
      ownerUserId,
      type,
    });

    return this.personalChatRepo.save(personalChat);
    // await this.personalChatRepo.save(personalChat);

    // return personalChat;
  }
}

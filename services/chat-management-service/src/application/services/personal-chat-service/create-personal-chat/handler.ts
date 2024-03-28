import { Id } from "ddd-node";
import { CreatePersonalChatCommand } from ".";
import { PersonalChat } from "../../../../domain/models/personal-chat/personal-chat";
import { Tag } from "../../../../domain/models/tag";
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

    const tags = (command.tags || []).map((tagString) => {
      const [name, ...valueSplited] = tagString.split(":");
      const value = valueSplited.join(":");

      return new Tag({ name, value });
    });

    const personalChat = PersonalChat.create({
      sourceChatId,
      ownerUserId,
      tags,
    });

    this.personalChatRepo.save(personalChat);
  }
}

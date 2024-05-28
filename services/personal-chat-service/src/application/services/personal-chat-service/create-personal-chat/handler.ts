import { Id } from "ddd-node";
import { CreatePersonalChatCommand } from ".";
import { PersonalChat } from "../../../../domain/models/personal-chat/personal-chat";
import { IPersonalChatRepo } from "../../../../domain/repositories/personal-chat.repo";
import { Type } from "../../../interfaces/type";
import { IAppCommandHandler } from "../../../base/app-command.base";
import { ChatType } from "../../../../domain/models/personal-chat/chat-type";

export class CreatePersonalChatHandler
  implements IAppCommandHandler<CreatePersonalChatCommand>
{
  constructor(private readonly personalChatRepo: IPersonalChatRepo) {}

  commandType(): Type<CreatePersonalChatCommand> {
    return CreatePersonalChatCommand;
  }

  async handleCommand(command: CreatePersonalChatCommand): Promise<any> {
    const { payload } = command;

    const sourceChatId = new Id(payload.sourceChatId);
    const ownerUserId = new Id(payload.ownerUserId);
    const type = ChatType.parse(payload.type);

    const personalChat = PersonalChat.create({
      sourceChatId,
      ownerUserId,
      type,
    });

    return this.personalChatRepo.save(personalChat);
  }
}

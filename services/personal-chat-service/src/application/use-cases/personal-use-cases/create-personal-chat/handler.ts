import { Id } from "ddd-node";
import { CreatePersonalChatCommand } from ".";
import { IDomainRegistry } from "../../../../domain/domain";
import { ChatType } from "../../../../domain/models/personal-chat/chat-type";
import { PersonalChat } from "../../../../domain/models/personal-chat/personal-chat";
import { IAppCommandHandler } from "../../../base/app-command";
import { Type } from "../../../utils/type";

export class CreatePersonalChatHandler
  implements IAppCommandHandler<CreatePersonalChatCommand>
{
  constructor(private readonly domainRegistry: IDomainRegistry) {}

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

    return this.domainRegistry.personalChatRepo().save(personalChat);
  }
}

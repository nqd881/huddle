import { inject, injectable } from "inversify";
import { CreatePersonalChatCommand } from ".";
import { ChatTypeBuilder } from "../../../../domain/models/personal-chat/chat-type";
import { PersonalChat } from "../../../../domain/models/personal-chat/personal-chat";
import { RepoRegistryToken } from "../../../app.token";
import { IAppCommandHandler } from "../../../base/app-command";
import { IRepoRegistry } from "../../../output-ports/repo-registry";
import { Type } from "../../../utils/type";

@injectable()
export class CreatePersonalChatHandler
  implements IAppCommandHandler<CreatePersonalChatCommand>
{
  constructor(
    @inject(RepoRegistryToken) private readonly repoRegistry: IRepoRegistry
  ) {}

  commandType(): Type<CreatePersonalChatCommand> {
    return CreatePersonalChatCommand;
  }

  async handleCommand(command: CreatePersonalChatCommand): Promise<any> {
    const { sourceChatId, ownerUserId } = command.payload;

    const type = ChatTypeBuilder().withValue(command.payload.type).build();

    const personalChat = PersonalChat.create({
      sourceChatId,
      ownerUserId,
      type,
    });

    return this.repoRegistry.personalChatRepo().save(personalChat);
  }
}

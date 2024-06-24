import { Id } from "ddd-node";
import {
  ReadingStatus,
  ReadingStatusMarker,
} from "../../../../domain/models/personal-chat/reading-status-marker";
import { IPersonalChatRepo } from "../../../../domain/repositories/personal-chat.repo";
import { PersonalChatNotFoundError } from "../_errors/personal-chat-not-found";
import { MarkPersonalChatAsReadCommand } from "./command";
import { Type } from "../../../utils/type";
import { IAppCommandHandler } from "../../../base/app-command";
import { IDomainRegistry } from "../../../../domain/domain";

export class MarkPersonalChatAsReadHandler
  implements IAppCommandHandler<MarkPersonalChatAsReadCommand>
{
  constructor(private readonly domainRegistry: IDomainRegistry) {}

  commandType(): Type<MarkPersonalChatAsReadCommand> {
    return MarkPersonalChatAsReadCommand;
  }

  async handleCommand(command: MarkPersonalChatAsReadCommand) {
    const { payload } = command;

    const personalChatId = new Id(payload.personalChatId);

    const personalChat = await this.domainRegistry
      .personalChatRepo()
      .findById(personalChatId);

    if (!personalChat) throw new PersonalChatNotFoundError(personalChatId);

    personalChat.mark(ReadingStatusMarker.newMarker(ReadingStatus.Read));

    return this.domainRegistry.personalChatRepo().save(personalChat);
  }
}

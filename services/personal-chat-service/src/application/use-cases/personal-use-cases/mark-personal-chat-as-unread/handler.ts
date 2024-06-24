import { Id } from "ddd-node";
import { IDomainRegistry } from "../../../../domain/domain";
import {
  ReadingStatus,
  ReadingStatusMarker,
} from "../../../../domain/models/personal-chat/reading-status-marker";
import { IAppCommandHandler } from "../../../base/app-command";
import { Type } from "../../../utils/type";
import { PersonalChatNotFoundError } from "../_errors/personal-chat-not-found";
import { MarkPersonalChatAsUnreadCommand } from "./command";

export class MarkPersonalChatAsUnreadHandler
  implements IAppCommandHandler<MarkPersonalChatAsUnreadCommand>
{
  constructor(private readonly domainRegistry: IDomainRegistry) {}

  commandType(): Type<MarkPersonalChatAsUnreadCommand> {
    return MarkPersonalChatAsUnreadCommand;
  }

  async handleCommand(command: MarkPersonalChatAsUnreadCommand): Promise<any> {
    const { payload } = command;

    const personalChatId = new Id(payload.personalChatId);

    const personalChat = await this.domainRegistry
      .personalChatRepo()
      .findById(personalChatId);

    if (!personalChat) throw new PersonalChatNotFoundError(personalChatId);

    personalChat.mark(ReadingStatusMarker.newMarker(ReadingStatus.UnRead));

    return this.domainRegistry.personalChatRepo().save(personalChat);
  }
}

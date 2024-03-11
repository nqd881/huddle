import { Id } from "ddd-node";
import {
  ReadingStatus,
  ReadingStatusMarker,
} from "../../../../domain/models/personal-chat/reading-status-marker";
import { IPersonalChatRepo } from "../../../../domain/repositories/personal-chat.repo";
import { PersonalChatNotFoundError } from "../_errors/personal-chat-not-found";
import { MarkPersonalChatAsReadCommand } from "./command";
import { ICommandHandler } from "../../../interfaces";
import { Type } from "../../../interfaces/type";

export class MarkPersonalChatAsReadHandler
  implements ICommandHandler<MarkPersonalChatAsReadCommand>
{
  constructor(private personalChatRepo: IPersonalChatRepo) {}

  commandType(): Type<MarkPersonalChatAsReadCommand> {
    return MarkPersonalChatAsReadCommand;
  }

  async handleCommand(command: MarkPersonalChatAsReadCommand) {
    const personalChatId = new Id(command.personalChatId);

    const personalChat = await this.personalChatRepo.findById(personalChatId);

    if (!personalChat) throw new PersonalChatNotFoundError(personalChatId);

    personalChat.mark(ReadingStatusMarker.newMarker(ReadingStatus.Read));

    this.personalChatRepo.save(personalChat);
  }
}

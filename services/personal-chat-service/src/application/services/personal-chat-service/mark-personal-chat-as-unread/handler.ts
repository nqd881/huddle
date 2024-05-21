import { Id } from "ddd-node";
import {
  ReadingStatus,
  ReadingStatusMarker,
} from "../../../../domain/models/personal-chat/reading-status-marker";
import { IPersonalChatRepo } from "../../../../domain/repositories/personal-chat.repo";
import { PersonalChatNotFoundError } from "../_errors/personal-chat-not-found";
import { MarkPersonalChatAsUnreadCommand } from "./command";
import { ICommandHandler } from "../../../interfaces";
import { Type } from "../../../interfaces/type";

export class MarkPersonalChatAsUnreadHandler
  implements ICommandHandler<MarkPersonalChatAsUnreadCommand>
{
  constructor(private personalChatRepo: IPersonalChatRepo) {}

  commandType(): Type<MarkPersonalChatAsUnreadCommand> {
    return MarkPersonalChatAsUnreadCommand;
  }

  async handleCommand(command: MarkPersonalChatAsUnreadCommand): Promise<any> {
    const personalChatId = new Id(command.personalChatId);

    const personalChat = await this.personalChatRepo.findById(personalChatId);

    if (!personalChat) throw new PersonalChatNotFoundError(personalChatId);

    personalChat.mark(ReadingStatusMarker.newMarker(ReadingStatus.UnRead));

    this.personalChatRepo.save(personalChat);
  }
}

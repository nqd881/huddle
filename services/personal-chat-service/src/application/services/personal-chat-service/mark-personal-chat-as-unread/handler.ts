import { Id } from "ddd-node";
import {
  ReadingStatus,
  ReadingStatusMarker,
} from "../../../../domain/models/personal-chat/reading-status-marker";
import { IPersonalChatRepo } from "../../../../domain/repositories/personal-chat.repo";
import { PersonalChatNotFoundError } from "../_errors/personal-chat-not-found";
import { MarkPersonalChatAsUnreadCommand } from "./command";
import { Type } from "../../../utils/type";
import { IAppCommandHandler } from "../../../base/app-command";

export class MarkPersonalChatAsUnreadHandler
  implements IAppCommandHandler<MarkPersonalChatAsUnreadCommand>
{
  constructor(private personalChatRepo: IPersonalChatRepo) {}

  commandType(): Type<MarkPersonalChatAsUnreadCommand> {
    return MarkPersonalChatAsUnreadCommand;
  }

  async handleCommand(command: MarkPersonalChatAsUnreadCommand): Promise<any> {
    const { payload } = command;

    const personalChatId = new Id(payload.personalChatId);

    const personalChat = await this.personalChatRepo.findById(personalChatId);

    if (!personalChat) throw new PersonalChatNotFoundError(personalChatId);

    personalChat.mark(ReadingStatusMarker.newMarker(ReadingStatus.UnRead));

    return this.personalChatRepo.save(personalChat);
  }
}

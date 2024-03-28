import { Inject } from "@nestjs/common";
import { IPersonalChatRepo } from "../../../domain/repositories/personal-chat.repo";
import { EventHandlerProvider } from "../event-bus/decorator";
import { IEventHandlerProvider } from "../event-bus/interface";
import { Repository } from "../repository/token";
import { LogWhenPersonalChatCreatedOrArchived } from "../../../application/event-handlers/log-when-personal-chat-created-or-archived";

@EventHandlerProvider
export class PersonalChatEventHandlerProvider implements IEventHandlerProvider {
  constructor(
    @Inject(Repository.PersonalChat) private personalChatRepo: IPersonalChatRepo
  ) {}

  getEventHandlers() {
    const { personalChatRepo } = this;

    return [new LogWhenPersonalChatCreatedOrArchived(personalChatRepo)];
  }
}

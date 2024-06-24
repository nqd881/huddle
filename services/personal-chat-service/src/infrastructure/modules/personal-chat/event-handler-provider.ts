import { Inject } from "@nestjs/common";
import { LogWhenPersonalChatCreatedOrArchived } from "../../../application/event-handlers/log-when-personal-chat-created-or-archived";
import { IPersonalChatRepo } from "../../../domain/repositories/personal-chat.repo";
import { EventHandlerProvider } from "../event-bus/decorator";
import { IEventHandlerProvider } from "../event-bus/interface";
import { PERSONAL_CHAT_REPO } from "../repositories/personal-chat-repo";

@EventHandlerProvider
export class PersonalChatEventHandlerProvider implements IEventHandlerProvider {
  constructor(
    @Inject(PERSONAL_CHAT_REPO) private personalChatRepo: IPersonalChatRepo
  ) {}

  provideEventHandlers() {
    const { personalChatRepo } = this;

    return [new LogWhenPersonalChatCreatedOrArchived(personalChatRepo)];
  }
}

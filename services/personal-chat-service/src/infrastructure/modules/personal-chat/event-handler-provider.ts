import { LogWhenPersonalChatCreatedOrArchived } from "../../../application/event-handlers/log-when-personal-chat-created-or-archived";
import { EventHandlerProvider } from "../event-bus/decorator";
import { IEventHandlerProvider } from "../event-bus/interface";
import { RepositoryService } from "../repository/repository.service";

@EventHandlerProvider
export class PersonalChatEventHandlerProvider implements IEventHandlerProvider {
  constructor(private repoService: RepositoryService) {}

  provideEventHandlers() {
    const { personalChatRepo } = this.repoService;

    return [new LogWhenPersonalChatCreatedOrArchived(personalChatRepo)];
  }
}

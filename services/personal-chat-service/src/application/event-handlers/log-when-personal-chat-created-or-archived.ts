import { Id } from "ddd-node";
import { PersonalChatArchived } from "../../domain/models/personal-chat/events";
import { PersonalChatCreated } from "../../domain/models/personal-chat/events/personal-chat-created";
import { IPersonalChatRepo } from "../../domain/repositories/personal-chat.repo";
import { IEventHandler } from "../interfaces";

export class LogWhenPersonalChatCreatedOrArchived
  implements IEventHandler<PersonalChatCreated | PersonalChatArchived>
{
  constructor(private personalChatRepo: IPersonalChatRepo) {}

  eventTypes() {
    return [PersonalChatCreated, PersonalChatArchived];
  }

  async handleEvent(event: PersonalChatCreated | PersonalChatArchived) {
    console.log(
      "Sending email when a personal chat was created or archived..."
    );
  }
}

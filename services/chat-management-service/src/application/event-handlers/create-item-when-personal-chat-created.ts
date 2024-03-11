import { PersonalChatCreated } from "../../domain/models/personal-chat/events/personal-chat-created";
import { IEventHandler } from "../interfaces";
import { Type } from "../interfaces/type";

export class CreateItemWhenPersonalChatCreated
  implements IEventHandler<PersonalChatCreated>
{
  eventType(): Type<PersonalChatCreated> {
    return PersonalChatCreated;
  }

  async handleEvent(event: PersonalChatCreated) {
    console.log("Creating new item when a personal chat was created...");
  }
}

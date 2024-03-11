import { Id } from "ddd-node";
import { PersonalChat } from "../../../../domain/models/personal-chat/personal-chat";
import { IPersonalChatRepo } from "../../../../domain/repositories/personal-chat.repo";
import { Injectable } from "@nestjs/common";

@Injectable()
export class PersonalChatRepo implements IPersonalChatRepo {
  async save(instance: PersonalChat): Promise<any> {
    console.log(`Saving personal chat with id ${instance.getId()}`);
  }

  async findById(id: Id): Promise<PersonalChat | null> {
    console.log(`Finding personal chat with id ${id.value}...`);

    return null;
  }
}

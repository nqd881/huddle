import { Injectable } from "@nestjs/common";
import { PersonalChat } from "../../../../domain/models/personal-chat/personal-chat";
import { PersonalChatModel } from "./personal-chat-model";
import { Id } from "ddd-node";
import { Notifications } from "../../../../domain/models/notifications";
import { IMapper } from "../_interfaces/mapper";

@Injectable()
export class PersonalChatMapper
  implements IMapper<PersonalChatModel, PersonalChat>
{
  toDomain(persistenceModel: PersonalChatModel): PersonalChat {
    const { id, sourceChatId, ownerUserId, archived } = persistenceModel;

    return PersonalChat.newAggregate(
      {
        sourceChatId: new Id(sourceChatId),
        ownerUserId: new Id(ownerUserId),
        notifications: Notifications.None,
        archived,
        tags: [],
      },
      new Id(id)
    );
  }

  toPersistence(domainModel: PersonalChat): PersonalChatModel {
    const { sourceChatId, ownerUserId, archived } = domainModel.props();

    return PersonalChatModel.build({
      id: domainModel.getId().value,
      sourceChatId: sourceChatId.value,
      ownerUserId: ownerUserId.value,
      archived,
    });
  }
}

import { Injectable } from "@nestjs/common";
import { PersonalChat } from "../../../../domain/models/personal-chat/personal-chat";
import { PersonalChatModel } from "./personal-chat-model";
import { Id } from "ddd-node";
import { Notifications } from "../../../../domain/models/notifications";
import { IMapper } from "../../../interface/mapper";
import { ChatType } from "../../../../domain/models/personal-chat/chat-type";

@Injectable()
export class PersonalChatMapper
  implements IMapper<PersonalChat, PersonalChatModel>
{
  toDomain(persistenceModel: PersonalChatModel): PersonalChat {
    const { id, type, sourceChatId, ownerUserId, archived } = persistenceModel;

    return PersonalChat.newAggregate(
      {
        sourceChatId: new Id(sourceChatId),
        ownerUserId: new Id(ownerUserId),
        type: ChatType.parse(type),
        notifications: Notifications.None,
        archived,
      },
      new Id(id)
    );
  }

  toPersistence(domainModel: PersonalChat): PersonalChatModel {
    const { sourceChatId, ownerUserId, type, archived } = domainModel.props();

    return PersonalChatModel.build({
      id: domainModel.id().value,
      sourceChatId: sourceChatId.value,
      ownerUserId: ownerUserId.value,
      type: type.value,
      archived,
    });
  }
}

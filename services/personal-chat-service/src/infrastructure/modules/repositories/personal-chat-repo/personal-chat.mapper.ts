import { Injectable } from "@nestjs/common";
import { StateAggregateBuilder } from "ddd-node";
import { Notifications } from "../../../../domain/models/notifications";
import {
  ChatType,
  ChatTypeBuilder,
} from "../../../../domain/models/personal-chat/chat-type";
import { PersonalChat } from "../../../../domain/models/personal-chat/personal-chat";
import { IMapper } from "../../../interface/mapper";
import { PersonalChatModel } from "./personal-chat.model";

@Injectable()
export class PersonalChatMapper
  implements IMapper<PersonalChat, PersonalChatModel>
{
  toDomain(persistenceModel: PersonalChatModel): PersonalChat {
    const { id, type, sourceChatId, ownerUserId, archived } = persistenceModel;

    const builder = new StateAggregateBuilder(PersonalChat);

    return builder
      .withId(id)
      .withProps({
        sourceChatId,
        ownerUserId,
        type: ChatTypeBuilder().withValue(type).build(),
        notifications: Notifications.None,
        archived,
      })
      .build();
  }

  toPersistence(domainModel: PersonalChat): PersonalChatModel {
    const { sourceChatId, ownerUserId, type, archived } = domainModel.props();

    return PersonalChatModel.build({
      id: domainModel.id(),
      sourceChatId,
      ownerUserId,
      type: type.value,
      archived,
    });
  }
}

import { Id } from "ddd-node";
import {
  FolderCreated,
  FolderCreatedProps,
} from "../../../../domain/models/folder/events/folder-created";
import { DomainEventDeserializerBase } from "../../my-event-store/my-event-deserializer/domain-event-deserializer.base";
import { DomainEventDeserializer } from "../../my-event-store/my-event-deserializer/domain-event-deserializer.decorator";

@DomainEventDeserializer(FolderCreated)
export class FolderCreatedEventDeserializer extends DomainEventDeserializerBase<FolderCreated> {
  deserializeEventProps(serializedEventProps: string): FolderCreatedProps {
    const serializedProps = JSON.parse(serializedEventProps);

    return {
      ownerUserId: new Id(serializedProps.ownerUserId),
      name: serializedProps.name,
    };
  }
}

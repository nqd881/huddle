import {
  FolderCreated,
  FolderCreatedProps,
} from "../../../../domain/models/folder/events/folder-created";
import { DomainEventSerializerBase } from "../../my-event-store/my-event-serializer/domain-event-serializer.base";
import { DomainEventSerializer } from "../../my-event-store/my-event-serializer/domain-event-serializer.decorator";

@DomainEventSerializer(FolderCreated)
export class FolderCreatedEventSerializer extends DomainEventSerializerBase<FolderCreated> {
  serializeEventProps(props: FolderCreatedProps): string {
    return JSON.stringify({
      name: props.name,
      ownerUserId: props.ownerUserId.value,
    });
  }
}

import {
  FolderCreated,
  FolderCreatedProps,
} from "../../../../domain/models/folder/events/folder-created";
import { DomainEventSerializer } from "../../my-event-store/my-event-serializer/domain-event-serializer";
import { InjectableDomainEventSerializer } from "../../my-event-store/my-event-serializer/domain-event-serializer.decorator";

@InjectableDomainEventSerializer(FolderCreated)
export class FolderCreatedEventSerializer extends DomainEventSerializer<FolderCreated> {
  serializeEventProps(props: FolderCreatedProps): string {
    return JSON.stringify({
      name: props.name,
      ownerUserId: props.ownerUserId.value,
    });
  }
}

import { AnyEvent, EventClass, PropsOf } from "ddd-node";
import { IEventSerializer } from "../../event-store/event-serializer";
import { StoredEvent } from "../../event-store/stored-event";
import { DomainEventSerializerMetaKey } from "./domain-event-serializer.decorator";

export interface IDomainEventSerializer<T extends AnyEvent>
  extends IEventSerializer<T> {
  serializeForEvent(): EventClass<T>;
}

export abstract class DomainEventSerializer<T extends AnyEvent>
  implements IDomainEventSerializer<T>
{
  serialize(event: T): StoredEvent {
    return new StoredEvent(
      event.modelName(),
      event.modelVersion(),
      event.eventType(),
      event.id().value,
      event.timestamp(),
      this.serializeEventProps(event.props() as PropsOf<T>)
    );
  }

  serializeForEvent() {
    const eventType = Reflect.getOwnMetadata(
      DomainEventSerializerMetaKey,
      this.constructor
    ) as EventClass<T> | undefined;

    if (!eventType) throw new Error("Not found event type for serializer");

    return eventType;
  }

  abstract serializeEventProps(props: PropsOf<T>): string;
}

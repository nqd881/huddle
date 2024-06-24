import { AnyEvent, EventClass, EventSource, PropsOf } from "ddd-node";
import { IEventSerializer } from "../../event-store";
import { StoredEvent } from "../stored-event";
import { DOMAIN_EVENT_SERIALIZER } from "./domain-event-serializer.meta";

export interface IDomainEventSerializer<T extends AnyEvent>
  extends IEventSerializer<T, StoredEvent> {
  resolveEventClass(): EventClass<T>;
}

export abstract class DomainEventSerializerBase<T extends AnyEvent>
  implements IDomainEventSerializer<T>
{
  resolveEventClass() {
    const eventClass = Reflect.getOwnMetadata(
      DOMAIN_EVENT_SERIALIZER,
      this.constructor
    ) as EventClass<T> | undefined;

    if (!eventClass) throw new Error("Not found event class for serializer");

    return eventClass;
  }

  serialize(event: T): StoredEvent {
    return new StoredEvent(
      event.modelId(),
      event.eventType(),
      event.id().value,
      new Date(event.timestamp()),
      this.serializeEventSource(event.source()),
      this.serializeEventProps(event.props() as PropsOf<T>)
    );
  }

  serializeEventSource(eventSource: EventSource) {
    const { aggregateModel, aggregateId, aggregateVersion } = eventSource;

    return `${aggregateModel}|${aggregateId.value}|${aggregateVersion}`;
  }

  abstract serializeEventProps(props: PropsOf<T>): string;
}

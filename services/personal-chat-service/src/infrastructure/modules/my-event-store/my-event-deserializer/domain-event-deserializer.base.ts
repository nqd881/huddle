import {
  AnyEvent,
  EventClass,
  EventClassWithTypedConstructor,
  EventSource,
  Id,
  PropsOf,
} from "ddd-node";
import { IEventDeserializer } from "../../event-store";
import { StoredEvent } from "../stored-event";
import { DOMAIN_EVENT_DESERIALIZER } from "./domain-event-deserializer.meta";

export interface IDomainEventDeserializer<T extends AnyEvent>
  extends IEventDeserializer<T, StoredEvent> {
  resolveEventClass(): EventClass<T>;
}

export abstract class DomainEventDeserializerBase<T extends AnyEvent>
  implements IDomainEventDeserializer<T>
{
  resolveEventClass(): EventClassWithTypedConstructor<T> {
    const eventClass = Reflect.getOwnMetadata(
      DOMAIN_EVENT_DESERIALIZER,
      this.constructor
    ) as EventClass<T> | undefined;

    if (!eventClass) throw new Error();

    return eventClass;
  }

  deserialize(storedEvent: StoredEvent) {
    const eventClass = this.resolveEventClass();

    return new eventClass(
      {
        id: new Id(storedEvent.eventId),
        source: this.deserializeEventSource(storedEvent.eventSource),
        timestamp: storedEvent.eventOccurredOn.getTime(),
      },
      this.deserializeEventProps(storedEvent.eventPayload)
    );
  }

  deserializeEventSource(serializedEventSource: string): EventSource {
    const [aggregateModel, aggregateId, aggregateVersion] =
      serializedEventSource.split("|");

    return {
      aggregateModel,
      aggregateId: new Id(aggregateId),
      aggregateVersion: Number(aggregateVersion),
    };
  }

  abstract deserializeEventProps(serializedEventProps: string): PropsOf<T>;
}

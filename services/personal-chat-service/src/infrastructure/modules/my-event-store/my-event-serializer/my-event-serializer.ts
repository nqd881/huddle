import { Injectable } from "@nestjs/common";
import { AnyEvent, EventClass } from "ddd-node";
import { IEventSerializer } from "../../event-store/event-serializer";
import { StoredEvent } from "../../event-store/stored-event";
import { DomainEventSerializerRegistry } from "./domain-event-serializer-registry";

@Injectable()
export class MyEventSerializer implements IEventSerializer<AnyEvent> {
  constructor(
    private domainEventSerializerRegistry: DomainEventSerializerRegistry
  ) {}

  serialize<T extends AnyEvent>(event: T): StoredEvent {
    const eventClass = event.constructor as EventClass<T>;

    const serializer =
      this.domainEventSerializerRegistry.getSerializerForEvent(eventClass);

    if (!serializer)
      throw new Error(`Cannot serialize instance event of class ${eventClass}`);

    return serializer.serialize(event);
  }
}

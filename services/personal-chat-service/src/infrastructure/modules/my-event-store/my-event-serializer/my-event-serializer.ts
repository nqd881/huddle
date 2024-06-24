import { Injectable } from "@nestjs/common";
import { AnyEvent, EventClass } from "ddd-node";
import { IEventSerializer } from "../../event-store";
import { DomainEventSerializerRegistry } from "./domain-event-serializer-registry";
import { StoredEvent } from "../stored-event";

@Injectable()
export class MyEventSerializer
  implements IEventSerializer<AnyEvent, StoredEvent>
{
  constructor(
    private domainEventSerializerRegistry: DomainEventSerializerRegistry
  ) {}

  serialize<T extends AnyEvent>(event: T): StoredEvent {
    const eventClass = event.constructor as EventClass<T>;

    const serializer = this.domainEventSerializerRegistry.getSerializer(
      eventClass.modelId()
    );

    if (!serializer)
      throw new Error(`Cannot serialize instance event of class ${eventClass}`);

    return serializer.serialize(event);
  }
}

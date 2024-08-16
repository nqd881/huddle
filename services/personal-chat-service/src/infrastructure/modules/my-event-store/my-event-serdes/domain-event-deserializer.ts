import { Inject, Injectable } from "@nestjs/common";
import { Domain, EventBuilder } from "ddd-node";
import { DOMAIN } from "../../domain";
import { StoredEvent } from "../stored-event";

@Injectable()
export class DomainEventDeserializer {
  constructor(@Inject(DOMAIN) private domain: Domain) {}

  deserialize(storedEvent: StoredEvent) {
    const eventClass = this.domain.modelRegistry.getModelByModelId(
      storedEvent.eventModelId
    );

    if (!eventClass) throw new Error();

    const eventBuilder = new EventBuilder(eventClass as any);

    return eventBuilder
      .withId(storedEvent.eventId)
      .withSource(storedEvent.eventSource)
      .withTimestamp(storedEvent.eventOccurredOn.getTime())
      .withContext(storedEvent.eventContext)
      .withProps(storedEvent.eventPayload)
      .build();
  }
}

import { Inject, Injectable } from "@nestjs/common";
import { AnyEvent, Domain, EventClass } from "ddd-node";
import { DOMAIN } from "../../domain";
import { StoredEvent } from "../stored-event";

@Injectable()
export class DomainEventSerializer {
  constructor(@Inject(DOMAIN) private domain: Domain) {}

  serialize(event: AnyEvent): StoredEvent {
    if (
      !this.domain.modelRegistry.hasRegisteredModel(
        event.constructor as EventClass
      )
    )
      throw new Error();

    const { modelId: eventModelId } = event.modelDescriptor();

    return new StoredEvent(
      eventModelId,
      event.eventType(),
      event.id(),
      new Date(event.timestamp()),
      event.source(),
      event.context() ?? {},
      event.props()
    );
  }
}

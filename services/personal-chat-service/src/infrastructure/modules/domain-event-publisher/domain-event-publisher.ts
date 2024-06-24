import { Injectable } from "@nestjs/common";
import { EventPublisher } from "ddd-node";
import { DomainEventSubscriberRegistry } from "../domain-event-subscriber-registry/domain-event-subscriber-registry";

@Injectable()
export class DomainEventPublisher extends EventPublisher {
  constructor(domainEventSubscriberRegistry: DomainEventSubscriberRegistry) {
    super(domainEventSubscriberRegistry);
  }
}

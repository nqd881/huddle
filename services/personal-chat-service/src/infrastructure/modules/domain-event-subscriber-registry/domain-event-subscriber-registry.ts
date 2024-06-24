import { Inject, Injectable, Optional } from "@nestjs/common";
import { EventSubscriberRegistry, IEventSubscriber } from "ddd-node";
import { DOMAIN_EVENT_SUBSCRIBERS } from "./token";

@Injectable()
export class DomainEventSubscriberRegistry extends EventSubscriberRegistry {
  constructor(
    @Optional()
    @Inject(DOMAIN_EVENT_SUBSCRIBERS)
    domainEventSubscribers?: IEventSubscriber[]
  ) {
    super(domainEventSubscribers);
  }
}

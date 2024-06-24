import { Type } from "@nestjs/common";
import { AnyEvent, EventClass } from "ddd-node";
import { IDomainEventDeserializer } from "./domain-event-deserializer.base";
import { DOMAIN_EVENT_DESERIALIZER } from "./domain-event-deserializer.meta";

export const DomainEventDeserializer = <T extends AnyEvent>(
  eventType: EventClass<T>
) => {
  return (target: Type<IDomainEventDeserializer<T>>) => {
    Reflect.defineMetadata(DOMAIN_EVENT_DESERIALIZER, eventType, target);
  };
};

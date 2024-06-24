import { Type } from "@nestjs/common";
import { AnyEvent, EventClass } from "ddd-node";
import { DomainEventSerializerBase } from "./domain-event-serializer.base";
import { DOMAIN_EVENT_SERIALIZER } from "./domain-event-serializer.meta";

export const DomainEventSerializer = <T extends AnyEvent>(
  eventType: EventClass<T>
) => {
  return (target: Type<DomainEventSerializerBase<T>>) => {
    Reflect.defineMetadata(DOMAIN_EVENT_SERIALIZER, eventType, target);
  };
};

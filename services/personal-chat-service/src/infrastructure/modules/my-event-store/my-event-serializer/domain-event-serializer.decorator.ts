import { Type } from "@nestjs/common";
import { AnyEvent, EventClass } from "ddd-node";
import { metaKey } from "../../../utils/meta-key";
import { DomainEventSerializer } from "./domain-event-serializer";

export const DomainEventSerializerMetaKey = metaKey("DomainEventSerializer");

export const InjectableDomainEventSerializer = <T extends AnyEvent>(
  eventType: EventClass<T>
) => {
  return (target: Type<DomainEventSerializer<T>>) => {
    Reflect.defineMetadata(DomainEventSerializerMetaKey, eventType, target);
  };
};

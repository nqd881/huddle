import { AnyEvent, EventClass } from "ddd-node";
import { DomainEventSerializer } from "./domain-event-serializer";
import { Injectable } from "@nestjs/common";

@Injectable()
export class DomainEventSerializerRegistry {
  private serializers: Map<EventClass, DomainEventSerializer<AnyEvent>> =
    new Map();

  registerSerializer(serializer: DomainEventSerializer<AnyEvent>) {
    this.serializers.set(serializer.serializeForEvent(), serializer);
  }

  getSerializerForEvent(event: EventClass) {
    return this.serializers.get(event);
  }
}

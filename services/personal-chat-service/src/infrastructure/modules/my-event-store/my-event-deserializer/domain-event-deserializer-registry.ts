import { Injectable } from "@nestjs/common";
import { AnyEvent, ModelId } from "ddd-node";
import { IDomainEventDeserializer } from "./domain-event-deserializer.base";

@Injectable()
export class DomainEventDeserializerRegistry {
  private deserializers: Map<ModelId, IDomainEventDeserializer<AnyEvent>> =
    new Map();

  registerDeserializer(deserializer: IDomainEventDeserializer<AnyEvent>) {
    const eventClass = deserializer.resolveEventClass();

    this.deserializers.set(eventClass.modelId(), deserializer);
  }

  getDeserializer(eventModelId: ModelId) {
    return this.deserializers.get(eventModelId);
  }
}

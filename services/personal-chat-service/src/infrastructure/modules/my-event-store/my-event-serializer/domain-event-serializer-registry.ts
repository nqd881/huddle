import { Injectable } from "@nestjs/common";
import { AnyEvent, ModelId } from "ddd-node";
import { IDomainEventSerializer } from "./domain-event-serializer.base";

@Injectable()
export class DomainEventSerializerRegistry {
  private serializers: Map<ModelId, IDomainEventSerializer<AnyEvent>> =
    new Map();

  registerSerializer(serializer: IDomainEventSerializer<AnyEvent>) {
    const eventClass = serializer.resolveEventClass();

    this.serializers.set(eventClass.modelId(), serializer);
  }

  getSerializer(eventModelId: ModelId) {
    return this.serializers.get(eventModelId);
  }
}

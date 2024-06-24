import { Injectable } from "@nestjs/common";
import {
  AnyEvent,
  DEFAULT_MODEL_DOMAIN,
  EventClass,
  domainManager,
} from "ddd-node";
import { IEventDeserializer } from "../../event-store";
import { StoredEvent } from "../stored-event";
import { DomainEventDeserializerRegistry } from "./domain-event-deserializer-registry";

@Injectable()
export class MyEventDeserializer
  implements IEventDeserializer<AnyEvent, StoredEvent>
{
  constructor(
    private domainEventDeserializerRegistry: DomainEventDeserializerRegistry
  ) {}

  async deserialize(storedEvent: StoredEvent) {
    const domain = domainManager.getDomain(DEFAULT_MODEL_DOMAIN);

    if (!domain) throw new Error("Default domain not found");

    const eventModel = domain.modelRegistry.getModelByModelId(
      storedEvent.eventModelId
    ) as EventClass | undefined;

    if (!eventModel)
      throw new Error("MyEventDeserializer: Event model not found");

    const deserializer = this.domainEventDeserializerRegistry.getDeserializer(
      eventModel.modelId()
    );

    if (!deserializer) throw new Error("Deserializer not found");

    return deserializer.deserialize(storedEvent);
  }
}

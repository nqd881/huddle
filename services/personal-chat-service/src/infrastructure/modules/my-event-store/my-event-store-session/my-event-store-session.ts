import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { DbService } from "../../db/db.service";
import { IEventStoreSession } from "../../event-store";
import { StoredEvent } from "../stored-event";
import {
  StoredEventModel,
  StoredEventModelAttributes,
} from "./stored-event.model";
import { DomainModelSerdesService } from "../../domain-model-serdes/domain-model-serdes.service";

@Injectable()
export class MyEventStoreSession implements IEventStoreSession<StoredEvent> {
  constructor(
    private dbService: DbService,
    private serdesService: DomainModelSerdesService,
    @InjectModel(StoredEventModel)
    private storedEventModel: typeof StoredEventModel
  ) {}

  async save(...storedEvent: StoredEvent[]): Promise<void>;
  async save(storedEvent: StoredEvent[]): Promise<void>;
  async save(
    p1: StoredEvent | StoredEvent[],
    ...p2: StoredEvent[]
  ): Promise<void> {
    const storedEvents = Array.isArray(p1) ? p1 : [p1, ...p2];

    const mappedStoredEvents = storedEvents.map((storedEvent) =>
      this.mapToStoredEventModelAttributes(storedEvent)
    );

    await this.storedEventModel.bulkCreate(mappedStoredEvents, {
      transaction: this.dbService.currentTransaction(),
    });
  }

  mapToStoredEventModelAttributes(
    storedEvent: StoredEvent
  ): StoredEventModelAttributes {
    const {
      eventModelId,
      eventType,
      eventId,
      eventOccurredOn,
      eventSource,
      eventContext,
      eventPayload,
    } = storedEvent;

    return {
      eventModelId,
      eventType,
      eventId,
      eventOccurredOn,
      eventSource: JSON.stringify(eventSource),
      eventContext: JSON.stringify(eventContext),
      eventPayload: JSON.stringify(eventPayload),
    };
  }
}

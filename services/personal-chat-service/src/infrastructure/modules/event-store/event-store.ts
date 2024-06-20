import { AnyEvent } from "ddd-node";
import { IEventStoreSession } from "./event-store-session";
import { IEventSerializer } from "./event-serializer";
import { Inject, Injectable } from "@nestjs/common";
import { StoredEvent } from "./stored-event";
import { EVENT_SERIALIZER, EVENT_STORE_SESSION } from "./token";

export interface IEventStore {
  append(event: AnyEvent): void;
  store(): Promise<void>;
}

@Injectable()
export class EventStore implements IEventStore {
  private _storedEvents: StoredEvent[] = [];

  constructor(
    @Inject(EVENT_STORE_SESSION)
    private eventStoreSession: IEventStoreSession,
    @Inject(EVENT_SERIALIZER) private eventSerializer: IEventSerializer
  ) {}

  append(event: AnyEvent) {
    const storedEvent = this.eventSerializer.serialize(event);

    this._storedEvents.push(storedEvent);
  }

  async store() {
    return this.eventStoreSession
      .save(this._storedEvents)
      .then(() => this.clearStoredEvents());
  }

  clearStoredEvents() {
    this._storedEvents = [];
  }
}

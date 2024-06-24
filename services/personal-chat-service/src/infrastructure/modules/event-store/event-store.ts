import { Inject, Injectable } from "@nestjs/common";

import { IStoredEvent } from "./interfaces/stored-event.interface";
import {
  EVENT_DESERIALIZER,
  EVENT_SERIALIZER,
  EVENT_STORE_SESSION,
} from "./token";
import {
  IEvent,
  IEventDeserializer,
  IEventSerializer,
  IEventStore,
  IEventStoreSession,
} from "./interfaces";

@Injectable()
export class EventStore<
  T extends IEvent = IEvent,
  U extends IStoredEvent = IStoredEvent
> implements IEventStore<T, U>
{
  private _storedEvents: U[] = [];

  constructor(
    @Inject(EVENT_STORE_SESSION)
    private eventStoreSession: IEventStoreSession<U>,
    @Inject(EVENT_SERIALIZER) private eventSerializer: IEventSerializer<T, U>,
    @Inject(EVENT_DESERIALIZER)
    private eventDeserializer: IEventDeserializer<T, U>
  ) {}

  serializeEvent(event: T) {
    return this.eventSerializer.serialize(event);
  }

  deserializeEvent(serializedEvent: U) {
    return this.eventDeserializer.deserialize(serializedEvent);
  }

  append(event: T) {
    const storedEvent = this.serializeEvent(event);

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

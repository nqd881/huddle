import { IEvent } from "./event.interface";
import { IStoredEvent } from "./stored-event.interface";

export interface IEventDeserializer<
  Event extends IEvent = IEvent,
  StoredEvent extends IStoredEvent = IStoredEvent
> {
  deserialize(storedEvent: StoredEvent): Event | Promise<Event>;
}

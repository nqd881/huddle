import { IEvent } from "./event.interface";
import { IStoredEvent } from "./stored-event.interface";

export interface IEventSerializer<
  Event extends IEvent = IEvent,
  StoredEvent extends IStoredEvent = IStoredEvent
> {
  serialize(event: Event): StoredEvent;
}

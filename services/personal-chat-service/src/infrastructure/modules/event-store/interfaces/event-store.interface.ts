import { IEvent } from "./event.interface";
import { IStoredEvent } from "./stored-event.interface";

export interface IEventStore<
  T extends IEvent = IEvent,
  U extends IStoredEvent = IStoredEvent
> {
  serializeEvent(event: T): U;
  deserializeEvent(serializedEvent: U): T | Promise<T>;
  append(event: T): void;
  store(): Promise<void>;
}

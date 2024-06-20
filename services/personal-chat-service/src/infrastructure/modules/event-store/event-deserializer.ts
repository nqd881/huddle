import { StoredEvent } from "./stored-event";

export interface IEventDeserializer<T = any> {
  deserialize(storedEvent: StoredEvent): T;
}

import { StoredEvent } from "./stored-event";

export interface IEventSerializer<T = any> {
  serialize(event: T): StoredEvent;
}

import { StoredEvent } from "./stored-event";

export interface IEventStoreSession {
  save(...storedEvent: StoredEvent[]): Promise<void>;
  save(storedEvent: StoredEvent[]): Promise<void>;
}

import { IStoredEvent } from "./stored-event.interface";

export interface IEventStoreSession<T extends IStoredEvent = IStoredEvent> {
  save(...storedEvent: T[]): Promise<void>;
  save(storedEvent: T[]): Promise<void>;
}

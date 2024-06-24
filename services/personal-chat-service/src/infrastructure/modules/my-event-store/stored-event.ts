import { IStoredEvent } from "../event-store/interfaces/stored-event.interface";

export class StoredEvent implements IStoredEvent {
  constructor(
    public readonly eventModelId: string,
    public readonly eventType: string,
    public readonly eventId: string,
    public readonly eventOccurredOn: Date,
    public readonly eventSource: string,
    public readonly eventPayload: string
  ) {}
}

import { IStoredEvent } from "../event-store/interfaces/stored-event.interface";

export interface StoredEventSource {
  aggregateId: string;
  aggregateVersion: number;
}

export interface StoredEventContext {
  correlationId?: string;
  causationId?: string;
}

export class StoredEvent implements IStoredEvent {
  constructor(
    public readonly eventModelId: string,
    public readonly eventType: string,
    public readonly eventId: string,
    public readonly eventOccurredOn: Date,
    public readonly eventSource: StoredEventSource,
    public readonly eventContext: StoredEventContext,
    public readonly eventPayload: object
  ) {}
}

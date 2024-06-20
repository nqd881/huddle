export class StoredEvent {
  constructor(
    public readonly eventModelName: string,
    public readonly eventModelVersion: number,
    public readonly eventType: string,
    public readonly eventId: string,
    public readonly eventOccurredOn: number,
    public readonly eventPayload: string
  ) {}
}

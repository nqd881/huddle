import { AnyEvent, IEventPublisher } from "ddd-node";
import { IAppEventBus } from "../../../application/base/app-event";

export class DomainEventPublisher implements IEventPublisher {
  constructor(private eventBus: IAppEventBus) {}

  async publish(event: AnyEvent) {
    await this.eventBus.publishEvent(event);
  }

  async publishAll(events: AnyEvent[]) {
    await Promise.all(events.map((event) => this.publish(event)));
  }
}

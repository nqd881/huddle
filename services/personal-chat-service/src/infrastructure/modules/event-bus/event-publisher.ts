import { IEvent } from "../../../application/interfaces";
import { IEventBus, IEventPublisher } from "./interface";

export class EventPublisher<EventBase extends IEvent = IEvent>
  implements IEventPublisher<EventBase>
{
  constructor(private eventBus: IEventBus<EventBase>) {}

  publish<T extends EventBase>(event: T) {
    return this.eventBus.publishEvent(event);
  }

  publishAll<T extends EventBase>(events: T[]) {
    return Promise.all(events.map((event) => this.publish(event)));
  }
}

import { IAppEvent, IAppEventBus } from "../../../application/base/app-event";
import { IEventPublisher } from "./interface";

export class EventPublisher<EventBase extends IAppEvent = IAppEvent>
  implements IEventPublisher<EventBase>
{
  constructor(private eventBus: IAppEventBus) {}

  publish<T extends EventBase>(event: T) {
    return this.eventBus.publishEvent(event);
  }

  publishAll<T extends EventBase>(events: T[]) {
    return Promise.all(events.map((event) => this.publish(event)));
  }
}

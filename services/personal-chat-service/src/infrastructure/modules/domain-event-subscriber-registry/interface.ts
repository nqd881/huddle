import { IEventSubscriber } from "ddd-node";

export interface IDomainEventSubscriberProvider {
  provide(): IEventSubscriber[];
}

import {
  IAppEvent,
  IAppEventHandler,
} from "../../../application/base/app-event";

export interface IEventPublisher<EventBase extends IAppEvent = IAppEvent> {
  publish<T extends EventBase>(event: T): Promise<any>;

  publishAll<T extends EventBase>(events: T[]): Promise<any>;
}

export interface IEventHandlerProvider {
  provideEventHandlers(): IAppEventHandler[];
}

import { ModuleMetadata, Type } from "@nestjs/common";
import { IEvent, IEventHandler } from "../../../application/interfaces";

export interface IEventBus<EventBase extends IEvent = IEvent> {
  publishEvent<T extends EventBase>(event: T): Promise<any>;
}

export interface IEventPublisher<EventBase extends IEvent = IEvent> {
  publish<T extends EventBase>(event: T): Promise<any>;

  publishAll<T extends EventBase>(events: T[]): Promise<any>;
}

export interface IEventHandlerProvider {
  provideEventHandlers(): IEventHandler[];
}

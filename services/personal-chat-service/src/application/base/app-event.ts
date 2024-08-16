import { Type } from "../utils/type";

// integration event
export interface IAppEvent {}

export interface IAppEventHandler<T extends IAppEvent = IAppEvent> {
  eventTypes(): Type<T> | Type<T>[];
  handleEvent(event: T): Promise<void>;
}

export interface IAppEventBus {
  registerHandler(handler: IAppEventHandler): void;
  registerHandlers(handlers: IAppEventHandler[]): void;
  publishEvent(event: IAppEvent): Promise<void>;
}

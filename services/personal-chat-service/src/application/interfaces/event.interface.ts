import { Type } from "../utils/type";

export interface IEvent {}

export interface IEventHandler<T extends IEvent = IEvent, R = any> {
  eventTypes(): Type<T> | Type<T>[];

  handleEvent(event: T): Promise<R>;
}

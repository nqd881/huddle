import { IEvent } from "./event.interface";
import { Type } from "./type";

export interface IEventHandler<T extends IEvent = IEvent, R = any> {
  eventType(): Type<T>;

  handleEvent(event: T): Promise<R>;
}

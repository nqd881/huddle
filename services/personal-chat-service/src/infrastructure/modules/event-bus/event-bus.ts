import { Inject, Injectable, Optional, Type } from "@nestjs/common";
import { IEvent, IEventHandler } from "../../../application/interfaces";
import { toArray } from "../../utils/to-array";
import { IEventBus } from "./interface";
import { EVENT_HANDLERS } from "./token";

@Injectable()
export class EventBus<EventBase extends IEvent = IEvent>
  implements IEventBus<EventBase>
{
  private _handlersMap: Map<Type<EventBase>, IEventHandler<EventBase>[]> =
    new Map();

  constructor(
    @Optional()
    @Inject(EVENT_HANDLERS)
    handlers: IEventHandler<EventBase>[] = []
  ) {
    this.registerHandlers(handlers);
  }

  registerHandlers(handlers: IEventHandler<EventBase>[]) {
    handlers.forEach((handler) => {
      this.registerHandler(handler);
    });
  }

  registerHandler<T extends EventBase>(handler: IEventHandler<T>) {
    const eventTypes = toArray(handler.eventTypes());

    eventTypes.forEach((eventType) => {
      const handlers = this._handlersMap.get(eventType) || [];

      handlers.push(handler);

      this._handlersMap.set(eventType, handlers);
    });
  }

  protected getEventHandlers<T extends EventBase>(eventType: Type<T>) {
    const handlers = this._handlersMap.get(eventType);

    return handlers || [];
  }

  async publishEvent<T extends EventBase>(event: T) {
    const eventType: Type<T> = Object.getPrototypeOf(event).constructor;

    const handlers = this.getEventHandlers(eventType);

    await Promise.all(handlers.map((handler) => handler.handleEvent(event)));
  }
}

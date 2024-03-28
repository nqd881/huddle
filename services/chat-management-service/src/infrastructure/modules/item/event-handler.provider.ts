import { IEvent, IEventHandler } from "../../../application/interfaces";
import { EventHandlerProvider } from "../event-bus/decorator";
import { IEventHandlerProvider } from "../event-bus/interface";

@EventHandlerProvider
export class ItemEventHandlerProvider implements IEventHandlerProvider {
  constructor() {}

  getEventHandlers(): IEventHandler<IEvent, any>[] {
    return [];
  }
}

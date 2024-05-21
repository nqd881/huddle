import { EventHandlerProvider } from "../event-bus/decorator";
import { IEventHandlerProvider } from "../event-bus/interface";

@EventHandlerProvider
export class FolderEventHandlerProvider implements IEventHandlerProvider {
  provideEventHandlers() {
    return [];
  }
}

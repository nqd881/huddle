import { IAppEventHandler } from "../../../application/base/app-event";

export interface IEventHandlerProvider {
  provideEventHandlers(): IAppEventHandler[];
}

import { Type } from "../interfaces/type";

export interface IAppEventMetadata {}

export interface IAppEvent<P extends object = {}> {
  metadata: IAppEventMetadata;
  payload: P;
}

export interface IAppEventHandler<T extends IAppEvent = IAppEvent> {
  eventType(): Type<T>;

  handleEvent(event: T): Promise<void>;
}

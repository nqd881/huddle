import { ModuleMetadata, Type } from "@nestjs/common";
import { IEvent, IEventHandler } from "../../../application/interfaces";

export interface EventBusOptions<T extends IEvent = IEvent> {
  handlers?: IEventHandler<T>[];
}

export interface EventBusModuleOptions<T extends IEvent = IEvent>
  extends EventBusOptions<T> {
  global?: boolean;
}

export interface EventBusOptionsFactory {
  build(): EventBusOptions | Promise<EventBusOptions>;
}

export interface EventBusModuleAsyncOptions
  extends Pick<ModuleMetadata, "imports"> {
  useClass?: Type<EventBusOptionsFactory>;
  useFactory?: (...args: any[]) => EventBusOptions | Promise<EventBusOptions>;
  inject?: any[];
  global?: boolean;
}

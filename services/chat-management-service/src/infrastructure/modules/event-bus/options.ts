import { ModuleMetadata, Type } from "@nestjs/common";
import { IEventHandler } from "../../../application/interfaces";

export interface EventBusOptions {
  handlers?: IEventHandler[];
}

export interface EventBusModuleOptions extends EventBusOptions {
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

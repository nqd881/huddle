import { ModuleMetadata, Type } from "@nestjs/common";
import { ICommandHandler } from "../../../application/interfaces";

export interface CommandBusModuleOptions {
  handlers: ICommandHandler[];
}

export interface CommandBusModuleOptionsFactory {
  build(): CommandBusModuleOptions | Promise<CommandBusModuleOptions>;
}

export interface CommandBusModuleAsyncOptions
  extends Pick<ModuleMetadata, "imports"> {
  useExisting?: Type<CommandBusModuleOptionsFactory>;
  useClass?: Type<CommandBusModuleOptionsFactory>;
  useFactory?: (
    ...args: any[]
  ) => CommandBusModuleOptions | Promise<CommandBusModuleOptions>;
  inject?: any[];
}

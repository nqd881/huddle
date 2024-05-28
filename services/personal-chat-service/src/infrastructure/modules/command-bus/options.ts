import { ModuleMetadata, Type } from "@nestjs/common";
import { CommandBusHookHandlerMap } from "./hook";
import { IAppCommandHandler } from "../../../application/base/app-command.base";

export interface CommandBusOptions {
  handlers?: IAppCommandHandler[];
  hooks?: CommandBusHookHandlerMap;
}

export interface CommandBusModuleOptions extends CommandBusOptions {
  global?: boolean;
}

export interface CommandBusOptionsFactory {
  build(): CommandBusOptions | Promise<CommandBusOptions>;
}

export interface CommandBusModuleAsyncOptions
  extends Pick<ModuleMetadata, "imports"> {
  useClass?: Type<CommandBusOptionsFactory>;
  useFactory?: (
    ...args: any[]
  ) => CommandBusOptions | Promise<CommandBusOptions>;
  inject?: any[];
  global?: boolean;
}

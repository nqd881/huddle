import { ModuleMetadata, Type } from "@nestjs/common";
import { ICommandHandler } from "../../../application/interfaces";

export interface CommandBusOptions {
  handlers?: ICommandHandler[];
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

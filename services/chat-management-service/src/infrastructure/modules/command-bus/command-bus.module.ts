import { DynamicModule, Module, Provider } from "@nestjs/common";
import { ICommandHandler } from "../../../application/interfaces";
import { CommandBusService } from "./command-bus.service";
import {
  CommandBusModuleAsyncOptions,
  CommandBusModuleOptions,
  CommandBusModuleOptionsFactory,
} from "./interface";
import { COMMAND_BUS_MODULE_OPTIONS, COMMAND_HANDLERS } from "./token";

@Module({})
export class CommandBusModule {
  static forRoot(
    options: ICommandHandler[] | CommandBusModuleOptions
  ): DynamicModule {
    const handlers: ICommandHandler[] = Array.isArray(options)
      ? options
      : options.handlers;

    return {
      module: CommandBusModule,
      providers: [
        { provide: COMMAND_HANDLERS, useValue: handlers },
        CommandBusService,
      ],
      exports: [CommandBusService],
    };
  }

  static forRootAsync(options: CommandBusModuleAsyncOptions): DynamicModule {
    const providers = this.createAsyncProviders(options);

    return {
      module: CommandBusModule,
      imports: [...(options?.imports || [])],
      providers: [...providers, CommandBusService],
      exports: [CommandBusService],
    };
  }

  static createAsyncProviders(
    options: CommandBusModuleAsyncOptions
  ): Provider[] {
    if (options.useFactory) {
      return [
        {
          provide: COMMAND_BUS_MODULE_OPTIONS,
          useFactory: options.useFactory,
          inject: options?.inject || [],
        },
        {
          provide: COMMAND_HANDLERS,
          useFactory: (options: CommandBusModuleOptions) => {
            return options.handlers;
          },
          inject: [COMMAND_BUS_MODULE_OPTIONS],
        },
      ];
    }

    if (options.useClass || options.useExisting) {
      return [
        {
          provide: COMMAND_BUS_MODULE_OPTIONS,
          useFactory: async (
            optionsFactory: CommandBusModuleOptionsFactory
          ) => {
            return optionsFactory.build();
          },
          inject: [(options?.useClass || options?.useExisting)!],
        },
      ];
    }

    return [];
  }
}

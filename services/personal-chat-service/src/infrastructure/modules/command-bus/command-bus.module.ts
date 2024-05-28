import { DiscoveryModule, DiscoveryService } from "@golevelup/nestjs-discovery";
import { DynamicModule, Module, OnModuleInit, Provider } from "@nestjs/common";
import { CommandBus } from "./command-bus";
import { CommandHandlerProviderMetaKey } from "./decorator";
import { ICommandHandlerProvider } from "./interface";
import {
  CommandBusModuleAsyncOptions,
  CommandBusModuleOptions,
  CommandBusOptionsFactory,
} from "./options";
import {
  COMMAND_BUS_HOOKS,
  COMMAND_BUS_OPTIONS,
  COMMAND_HANDLERS,
} from "./token";
import _ from "lodash";

@Module({
  imports: [DiscoveryModule],
  providers: [CommandBus],
  exports: [CommandBus],
})
export class CommandBusModule implements OnModuleInit {
  constructor(
    private discoveryService: DiscoveryService,
    private commandBus: CommandBus
  ) {}

  async onModuleInit() {
    const commandHandlerProviders =
      await this.discoveryService.providersWithMetaAtKey(
        CommandHandlerProviderMetaKey
      );

    commandHandlerProviders.forEach(({ meta, discoveredClass }) => {
      this.commandBus.registerHandlers(
        (
          discoveredClass.instance as ICommandHandlerProvider
        ).provideCommandHandlers()
      );
    });
  }

  static forRoot(options?: CommandBusModuleOptions): DynamicModule {
    return {
      module: CommandBusModule,
      providers: [
        { provide: COMMAND_HANDLERS, useValue: options?.handlers },
        { provide: COMMAND_BUS_HOOKS, useValue: options?.hooks },
      ],
      global: options?.global,
    };
  }

  static forRootAsync(options: CommandBusModuleAsyncOptions): DynamicModule {
    const providers = this.createAsyncProviders(options);

    return {
      module: CommandBusModule,
      imports: [...(options?.imports || [])],
      providers,
      global: options.global,
    };
  }

  private static createAsyncProviders(
    options: CommandBusModuleAsyncOptions
  ): Provider[] {
    const commandHandlersProvider: Provider = {
      provide: COMMAND_HANDLERS,
      useFactory: (options: CommandBusModuleOptions) => {
        return options?.handlers;
      },
      inject: [COMMAND_BUS_OPTIONS],
    };

    const commandBusHookProvider: Provider = {
      provide: COMMAND_BUS_HOOKS,
      useFactory: (options: CommandBusModuleOptions) => {
        return options?.hooks;
      },
      inject: [COMMAND_BUS_OPTIONS],
    };

    if (options.useFactory) {
      return [
        commandHandlersProvider,
        commandBusHookProvider,
        {
          provide: COMMAND_BUS_OPTIONS,
          useFactory: options.useFactory,
          inject: options?.inject || [],
        },
      ];
    }

    if (options.useClass) {
      return [
        commandHandlersProvider,
        commandBusHookProvider,
        {
          provide: COMMAND_BUS_OPTIONS,
          useFactory: (optionsFactory: CommandBusOptionsFactory) =>
            optionsFactory.build(),
          inject: [options.useClass],
        },
      ];
    }

    return [];
  }
}

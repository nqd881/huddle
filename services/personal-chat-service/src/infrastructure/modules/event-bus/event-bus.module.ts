import { DiscoveryModule, DiscoveryService } from "@golevelup/nestjs-discovery";
import { DynamicModule, Module, OnModuleInit, Provider } from "@nestjs/common";
import { EventHandlerProviderMetaKey } from "./decorator";
import { EventBus } from "./event-bus";
import { IEventHandlerProvider } from "./interface";
import {
  EventBusModuleAsyncOptions,
  EventBusModuleOptions,
  EventBusOptionsFactory,
} from "./options";
import { EVENT_BUS_OPTIONS, EVENT_HANDLERS } from "./token";

@Module({
  imports: [DiscoveryModule],
  providers: [EventBus],
  exports: [EventBus],
})
export class EventBusModule implements OnModuleInit {
  constructor(
    private dicoveryService: DiscoveryService,
    private eventBus: EventBus
  ) {}

  async onModuleInit() {
    const eventHandlerProviders =
      await this.dicoveryService.providersWithMetaAtKey(
        EventHandlerProviderMetaKey
      );

    eventHandlerProviders.forEach(({ discoveredClass }) => {
      this.eventBus.registerHandlers(
        (
          discoveredClass.instance as IEventHandlerProvider
        ).provideEventHandlers()
      );
    });
  }

  static forRoot(options?: EventBusModuleOptions): DynamicModule {
    return {
      module: EventBusModule,
      providers: [
        {
          provide: EVENT_HANDLERS,
          useValue: options?.handlers,
        },
      ],
      global: options?.global,
    };
  }

  static forRootAsync(options: EventBusModuleAsyncOptions): DynamicModule {
    const providers = this.createAsyncProviders(options);

    return {
      module: EventBusModule,
      imports: [...(options?.imports || [])],
      providers,
      global: options.global,
    };
  }

  private static createAsyncProviders(
    options: EventBusModuleAsyncOptions
  ): Provider[] {
    const eventHandlersProvider: Provider = {
      provide: EVENT_HANDLERS,
      useFactory: (options: EventBusModuleOptions) => {
        return options.handlers;
      },
      inject: [EVENT_BUS_OPTIONS],
    };

    if (options.useFactory) {
      return [
        eventHandlersProvider,
        {
          provide: EVENT_BUS_OPTIONS,
          useFactory: options.useFactory,
          inject: options?.inject || [],
        },
      ];
    }

    if (options.useClass) {
      return [
        eventHandlersProvider,
        {
          provide: EVENT_HANDLERS,
          useFactory: (optionsFactory: EventBusOptionsFactory) =>
            optionsFactory.build(),
          inject: [options.useClass],
        },
      ];
    }

    return [];
  }
}

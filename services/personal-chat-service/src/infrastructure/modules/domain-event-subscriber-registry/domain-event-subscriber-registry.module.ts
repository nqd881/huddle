import {
  DynamicModule,
  Module,
  ModuleMetadata,
  Provider,
} from "@nestjs/common";
import { DomainEventSubscriberRegistry } from "./domain-event-subscriber-registry";
import { IEventSubscriber } from "ddd-node";
import {
  DOMAIN_EVENT_SUBSCRIBERS,
  DOMAIN_EVENT_SUBSCRIBER_REGISTRY_OPTIONS,
} from "./token";

export interface DomainEventSubscriberRegistryOptions {
  subscribers?: IEventSubscriber[];
}

export interface DomainEventSubscriberRegistryModuleOptions
  extends DomainEventSubscriberRegistryOptions {
  global?: boolean;
}

export interface DomainEventSubscriberRegistryModuleAsyncOptions
  extends Pick<ModuleMetadata, "imports"> {
  useFactory?: (
    ...args: any[]
  ) =>
    | DomainEventSubscriberRegistryOptions
    | Promise<DomainEventSubscriberRegistryOptions>;
  inject?: any[];
  global?: boolean;
}

@Module({
  imports: [],
  providers: [DomainEventSubscriberRegistry],
  exports: [DomainEventSubscriberRegistry],
})
export class DomainEventSubscriberRegistryModule {
  static forRoot(
    options?: DomainEventSubscriberRegistryModuleOptions
  ): DynamicModule {
    return {
      module: DomainEventSubscriberRegistryModule,
      providers: [
        {
          provide: DOMAIN_EVENT_SUBSCRIBERS,
          useValue: options?.subscribers || [],
        },
      ],
      exports: [],
      global: options?.global,
    };
  }

  static forRootAsync(
    options?: DomainEventSubscriberRegistryModuleAsyncOptions
  ): DynamicModule {
    return {
      module: DomainEventSubscriberRegistryModule,
      imports: options?.imports,
      providers: this.createAsyncProviders(options),
      global: options?.global,
    };
  }

  static createAsyncProviders(
    options?: DomainEventSubscriberRegistryModuleAsyncOptions
  ): Provider[] {
    const domainEventSubscribersProvider: Provider = {
      provide: DOMAIN_EVENT_SUBSCRIBERS,
      useFactory: (options: DomainEventSubscriberRegistryOptions) => {
        return options.subscribers;
      },
      inject: [DOMAIN_EVENT_SUBSCRIBER_REGISTRY_OPTIONS],
    };

    if (options?.useFactory) {
      return [
        domainEventSubscribersProvider,
        {
          provide: DOMAIN_EVENT_SUBSCRIBER_REGISTRY_OPTIONS,
          useFactory: options.useFactory,
          inject: options?.inject,
        },
      ];
    }

    throw new Error("Lack of useFactory");
  }
}

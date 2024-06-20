import {
  DynamicModule,
  Module,
  ModuleMetadata,
  Provider,
  Type,
} from "@nestjs/common";
import { EventStore, IEventStore } from "./event-store";
import { DbModule } from "../db/db.module";
import { IEventStoreSession } from "./event-store-session";
import { IEventSerializer } from "./event-serializer";
import {
  EVENT_SERIALIZER,
  EVENT_STORE_OPTIONS,
  EVENT_STORE_SESSION,
} from "./token";

export interface EventStoreOptions {
  session: IEventStoreSession;
  serializer: IEventSerializer;
}

export interface EventStoreModuleOptions extends EventStoreOptions {
  global?: boolean;
}

export interface EventStoreOptionsBuilder {
  build(): EventStoreOptions | Promise<EventStoreOptions>;
}

export interface EventStoreModuleAsyncOptions
  extends Pick<ModuleMetadata, "imports" | "exports"> {
  useClass?: Type<EventStoreOptionsBuilder>;
  useFactory?: (
    ...args: any[]
  ) => EventStoreOptions | Promise<EventStoreOptions>;
  inject?: any[];
  global?: boolean;
}

@Module({
  providers: [EventStore],
  exports: [EventStore],
})
export class EventStoreModule {
  static forRoot(options: EventStoreModuleOptions): DynamicModule {
    return {
      module: EventStoreModule,
      providers: [
        { provide: EVENT_STORE_SESSION, useValue: options.session },
        { provide: EVENT_SERIALIZER, useValue: options.serializer },
      ],
      global: options?.global,
    };
  }

  static forRootAsync(options: EventStoreModuleAsyncOptions): DynamicModule {
    const providers = this.createAsyncProviders(options);

    return {
      module: EventStoreModule,
      imports: options?.imports,
      providers,
      global: options?.global,
      exports: options?.exports,
    };
  }

  private static createAsyncProviders(
    options: EventStoreModuleAsyncOptions
  ): Provider[] {
    const sessionProvider: Provider = {
      provide: EVENT_STORE_SESSION,
      useFactory: (options: EventStoreOptions) => {
        return options.session;
      },
      inject: [EVENT_STORE_OPTIONS],
    };

    const serializerProvider: Provider = {
      provide: EVENT_SERIALIZER,
      useFactory: (options: EventStoreOptions) => {
        return options.serializer;
      },
      inject: [EVENT_STORE_OPTIONS],
    };

    if (options?.useClass) {
      return [
        sessionProvider,
        serializerProvider,
        {
          provide: EVENT_STORE_OPTIONS,
          useFactory: (optionsBuilder: EventStoreOptionsBuilder) => {
            return optionsBuilder.build();
          },
          inject: [options.useClass],
        },
      ];
    }

    if (options?.useFactory) {
      return [
        sessionProvider,
        serializerProvider,
        {
          provide: EVENT_STORE_OPTIONS,
          useFactory: options.useFactory,
          inject: options?.inject,
        },
      ];
    }

    throw new Error("Lack of useClass or useFactory");
  }
}

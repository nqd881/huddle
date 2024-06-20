import { DiscoveryModule, DiscoveryService } from "@golevelup/nestjs-discovery";
import { Module, OnModuleInit } from "@nestjs/common";
import { AnyEvent, EventClass } from "ddd-node";
import { IEventSerializer } from "../event-store/event-serializer";
import { IEventStoreSession } from "../event-store/event-store-session";
import { EventStoreModule } from "../event-store/event-store.module";
import { DomainEventSerializer } from "./my-event-serializer/domain-event-serializer";
import { DomainEventSerializerRegistry } from "./my-event-serializer/domain-event-serializer-registry";
import { DomainEventSerializerMetaKey } from "./my-event-serializer/domain-event-serializer.decorator";
import { MyEventSerializer } from "./my-event-serializer/my-event-serializer";
import { MyEventSerializerModule } from "./my-event-serializer/my-event-serializer.module";
import { MyEventStoreSession } from "./my-event-store-session/my-event-store-session";
import { MyEventStoreSessionModule } from "./my-event-store-session/my-event-store-session.module";

@Module({
  imports: [
    DiscoveryModule,
    EventStoreModule.forRootAsync({
      imports: [MyEventStoreSessionModule, MyEventSerializerModule],
      useFactory: (
        session: IEventStoreSession,
        serializer: IEventSerializer
      ) => {
        return {
          session,
          serializer,
        };
      },
      inject: [MyEventStoreSession, MyEventSerializer],
      exports: [MyEventStoreSessionModule, MyEventSerializerModule],
      global: true,
    }),
  ],
})
export class MyEventStoreModule implements OnModuleInit {
  constructor(
    private discoveryService: DiscoveryService,
    private domainEventSerializerRegistry: DomainEventSerializerRegistry
  ) {}

  async onModuleInit() {
    const domainEventSerializers =
      await this.discoveryService.providersWithMetaAtKey<EventClass>(
        DomainEventSerializerMetaKey
      );

    domainEventSerializers.forEach(({ discoveredClass }) => {
      this.domainEventSerializerRegistry.registerSerializer(
        discoveredClass.instance as DomainEventSerializer<AnyEvent>
      );
    });
  }
}

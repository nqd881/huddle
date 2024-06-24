import { DiscoveryModule, DiscoveryService } from "@golevelup/nestjs-discovery";
import { Module, OnModuleInit } from "@nestjs/common";
import { AnyEvent, EventClass } from "ddd-node";
import { DomainEventSerializerRegistry } from "./domain-event-serializer-registry";
import { IDomainEventSerializer } from "./domain-event-serializer.base";
import { DOMAIN_EVENT_SERIALIZER } from "./domain-event-serializer.meta";
import { MyEventSerializer } from "./my-event-serializer";

@Module({
  imports: [DiscoveryModule],
  providers: [DomainEventSerializerRegistry, MyEventSerializer],
  exports: [MyEventSerializer],
})
export class MyEventSerializerModule implements OnModuleInit {
  constructor(
    private discoveryService: DiscoveryService,
    private domainEventSerializerRegistry: DomainEventSerializerRegistry
  ) {}

  async onModuleInit() {
    const domainEventSerializers =
      await this.discoveryService.providersWithMetaAtKey<EventClass>(
        DOMAIN_EVENT_SERIALIZER
      );

    domainEventSerializers.forEach(({ discoveredClass }) => {
      this.domainEventSerializerRegistry.registerSerializer(
        discoveredClass.instance as IDomainEventSerializer<AnyEvent>
      );
    });
  }
}

import { DiscoveryModule, DiscoveryService } from "@golevelup/nestjs-discovery";
import { Module, OnModuleInit } from "@nestjs/common";
import { AnyEvent, EventClass } from "ddd-node";
import { DomainEventDeserializerRegistry } from "./domain-event-deserializer-registry";
import { IDomainEventDeserializer } from "./domain-event-deserializer.base";
import { DOMAIN_EVENT_DESERIALIZER } from "./domain-event-deserializer.meta";
import { MyEventDeserializer } from "./my-event-deserializer";

@Module({
  imports: [DiscoveryModule],
  providers: [DomainEventDeserializerRegistry, MyEventDeserializer],
  exports: [MyEventDeserializer],
})
export class MyEventDeserializerModule implements OnModuleInit {
  constructor(
    private discoveryService: DiscoveryService,
    private domainEventDeserializerRegistry: DomainEventDeserializerRegistry
  ) {}

  async onModuleInit() {
    const domainEventDeserializers =
      await this.discoveryService.providersWithMetaAtKey<EventClass>(
        DOMAIN_EVENT_DESERIALIZER
      );

    domainEventDeserializers.forEach(({ discoveredClass }) => {
      this.domainEventDeserializerRegistry.registerDeserializer(
        discoveredClass.instance as IDomainEventDeserializer<AnyEvent>
      );
    });
  }
}

import { Module } from "@nestjs/common";
import { MyEventSerializer } from "./my-event-serializer";
import { DomainEventSerializerRegistry } from "./domain-event-serializer-registry";

@Module({
  providers: [DomainEventSerializerRegistry, MyEventSerializer],
  exports: [DomainEventSerializerRegistry, MyEventSerializer],
})
export class MyEventSerializerModule {}

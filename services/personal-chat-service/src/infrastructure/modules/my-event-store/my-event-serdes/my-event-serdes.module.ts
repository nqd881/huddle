import { Module } from "@nestjs/common";
import { DomainEventSerializer } from "./domain-event-serializer";
import { DomainEventDeserializer } from "./domain-event-deserializer";
import { DomainModule } from "../../domain";

@Module({
  imports: [DomainModule.forRoot()],
  providers: [DomainEventSerializer, DomainEventDeserializer],
  exports: [DomainEventSerializer, DomainEventDeserializer],
})
export class MyEventSerdesModule {}

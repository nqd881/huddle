import { Module } from "@nestjs/common";
import {
  EventStoreModule,
  IEventDeserializer,
  IEventSerializer,
  IEventStoreSession,
} from "../event-store";

import { MyEventStoreSession } from "./my-event-store-session/my-event-store-session";
import { MyEventStoreSessionModule } from "./my-event-store-session/my-event-store-session.module";
import { DomainModule } from "../domain";
import { MyEventSerdesModule } from "./my-event-serdes/my-event-serdes.module";
import { DomainEventSerializer } from "./my-event-serdes/domain-event-serializer";
import { DomainEventDeserializer } from "./my-event-serdes/domain-event-deserializer";

@Module({
  imports: [
    EventStoreModule.forRootAsync({
      imports: [
        DomainModule.forRoot(),
        MyEventStoreSessionModule,
        MyEventSerdesModule,
      ],
      useFactory: (
        session: IEventStoreSession,
        serializer: IEventSerializer,
        deserializer: IEventDeserializer
      ) => {
        return {
          session,
          serializer,
          deserializer,
        };
      },
      inject: [
        MyEventStoreSession,
        DomainEventSerializer,
        DomainEventDeserializer,
      ],
      global: true,
    }),
  ],
})
export class MyEventStoreModule {}

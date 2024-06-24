import { Module } from "@nestjs/common";
import {
  EventStoreModule,
  IEventDeserializer,
  IEventSerializer,
  IEventStoreSession,
} from "../event-store";
import {
  MyEventDeserializer,
  MyEventDeserializerModule,
} from "./my-event-deserializer";
import { MyEventSerializer } from "./my-event-serializer/my-event-serializer";
import { MyEventSerializerModule } from "./my-event-serializer/my-event-serializer.module";
import { MyEventStoreSession } from "./my-event-store-session/my-event-store-session";
import { MyEventStoreSessionModule } from "./my-event-store-session/my-event-store-session.module";

@Module({
  imports: [
    EventStoreModule.forRootAsync({
      imports: [
        MyEventStoreSessionModule,
        MyEventSerializerModule,
        MyEventDeserializerModule,
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
      inject: [MyEventStoreSession, MyEventSerializer, MyEventDeserializer],
      global: true,
    }),
  ],
})
export class MyEventStoreModule {}

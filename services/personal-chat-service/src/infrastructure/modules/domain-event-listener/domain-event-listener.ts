import { Inject, Injectable } from "@nestjs/common";
import { StoredEvent } from "../my-event-store/stored-event";
import { Kafka } from "kafkajs";
import { EventStore } from "../event-store";
import { App } from "../../../application/app";
import { AppCoreToken } from "../app-core";
import { AnyEvent } from "ddd-node";
import { ClsService } from "nestjs-cls";

@Injectable()
export class DomainEventListener {
  constructor(
    private eventStore: EventStore,
    @Inject(AppCoreToken) private appCore: App,
    private clsService: ClsService
  ) {}

  async listen() {
    const kafka = new Kafka({
      clientId: "personal_chat_service",
      brokers: ["localhost:9092"],
    });

    const consumer = kafka.consumer({ groupId: "domain_event_publisher" });

    await consumer.connect();

    await consumer.subscribe({
      topic: "test.public.domain_events",
      fromBeginning: true,
    });

    await consumer.run({
      eachMessage: async ({ message }) => {
        this.clsService.run(async () => {
          const messageValue = message.value?.toString();

          if (!messageValue) return;

          const messageObj = JSON.parse(messageValue);

          if (messageObj.level === "ERROR") return;

          const {
            eventModelId,
            eventType,
            eventSource,
            eventContext,
            eventId,
            eventOccurredOn,
            eventPayload,
          } = messageObj.after;

          try {
            const storedEvent = new StoredEvent(
              eventModelId,
              eventType,
              eventId,
              new Date(eventOccurredOn),
              JSON.parse(eventSource),
              JSON.parse(eventContext),
              JSON.parse(eventPayload)
            );

            const event = (await this.eventStore.deserializeEvent(
              storedEvent
            )) as AnyEvent;

            this.appCore.handleDomainEvent(event);
          } catch (error) {
            console.log(error);
          }
        });
      },

      // eachMessage: async ({ message }) => {
      //   const messageValue = message.value?.toString();

      //   if (!messageValue) return;

      //   const messageObj = JSON.parse(messageValue);

      //   if (messageObj.level === "ERROR") return;

      //   const {
      //     eventModelId,
      //     eventType,
      //     eventSource,
      //     eventContext,
      //     eventId,
      //     eventOccurredOn,
      //     eventPayload,
      //   } = messageObj.after;

      //   try {
      //     const storedEvent = new StoredEvent(
      //       eventModelId,
      //       eventType,
      //       eventId,
      //       new Date(eventOccurredOn),
      //       JSON.parse(eventSource),
      //       JSON.parse(eventContext),
      //       JSON.parse(eventPayload)
      //     );

      //     const event = (await this.eventStore.deserializeEvent(
      //       storedEvent
      //     )) as AnyEvent;

      //     this.appCore.handleDomainEvent(event);
      //   } catch (error) {
      //     console.log(error);
      //   }
      // },
    });
  }
}

import { Module, OnModuleInit } from "@nestjs/common";
import { Kafka } from "kafkajs";
import { EventStore } from "../event-store/event-store";
import { StoredEvent } from "../my-event-store/stored-event";
import { DomainEventPublisher } from "./domain-event-publisher";
import { AnyEvent } from "ddd-node";
import { DomainEventSubscriberRegistryModule } from "../domain-event-subscriber-registry/domain-event-subscriber-registry.module";
import { DomainRegistryModule } from "../domain-registry/domain-registry.module";
import { CreateFolderItemsWhenFolderCreated } from "../../../application/event-subscribers/create-folder-items-when-folder-created";
import { DomainRegistry } from "../domain-registry/domain-registry";

@Module({
  imports: [
    DomainEventSubscriberRegistryModule.forRootAsync({
      imports: [DomainRegistryModule],
      useFactory: (domainRegistry) => {
        return {
          subscribers: [new CreateFolderItemsWhenFolderCreated(domainRegistry)],
        };
      },
      inject: [DomainRegistry],
    }),
  ],
  providers: [DomainEventPublisher],
  exports: [DomainEventPublisher],
})
export class DomainEventPublisherModule implements OnModuleInit {
  constructor(
    private eventStore: EventStore,
    private domainEventPublisher: DomainEventPublisher
  ) {}

  async onModuleInit() {
    const kafka = new Kafka({
      clientId: "personal_chat_service",
      brokers: ["localhost:9092"],
    });

    const consumer = kafka.consumer({ groupId: "domain_event_publisher" });

    await consumer.connect();

    await consumer.subscribe({
      topic: "test.public.events",
      fromBeginning: true,
    });

    consumer.run({
      eachMessage: async ({ message }) => {
        const messageValue = message.value?.toString();

        if (!messageValue) return;

        const messageObj = JSON.parse(messageValue);

        if (messageObj.level === "ERROR") return;

        const {
          eventModelId,
          eventType,
          eventSource,
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
            eventSource,
            eventPayload
          );

          const event = (await this.eventStore.deserializeEvent(
            storedEvent
          )) as AnyEvent;

          this.domainEventPublisher.publish(event);
        } catch (error) {
          console.log(error);
        }
      },
    });
  }
}

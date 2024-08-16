import { Module, OnModuleInit } from "@nestjs/common";
import { DomainEventListener } from "./domain-event-listener";
import { AppCoreModule } from "../app-core";

@Module({
  imports: [AppCoreModule],
  providers: [DomainEventListener],
  exports: [],
})
export class DomainEventListenerModule implements OnModuleInit {
  constructor(private domainEventListener: DomainEventListener) {}

  async onModuleInit() {
    await this.domainEventListener.listen();
  }
}

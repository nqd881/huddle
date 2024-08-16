import {
  AnyEvent,
  EventPublisher,
  EventSubscriberRegistry,
  IEventSubscriber,
} from "ddd-node";
import { Container } from "inversify";
import {
  AppCommandBusToken,
  CommandHandlerToken,
  DomainEventSubscriberToken,
  RepoRegistryToken,
} from "./app.token";
import {
  AppCommandBus,
  IAppCommand,
  IAppCommandBus,
  IAppCommandHandler,
} from "./base";
import { DomainEventSubscribersModule } from "./domain-event-subscribers/domain-event-subscribers.module";
import { IRepoRegistry } from "./output-ports/repo-registry";
import { FolderCommandHandlerModule } from "./use-cases/folder/folder-command-handler.module";
import { PersonalChatCommandHandlerModule } from "./use-cases/personal-chat/personal-chat-command-handler.module";
import { UserCommandHandlerModule } from "./use-cases/user/user-command-handler.module";

export interface IAppOptions {}

export class App extends Container {
  private domainEventSubscriberRegistry: EventSubscriberRegistry =
    new EventSubscriberRegistry();

  constructor(repoRegistry: IRepoRegistry) {
    super({ skipBaseClassChecks: true });

    this.bindRepoRegistry(repoRegistry);
    this.bindAppCommandBus();

    this.loadCommandHandlerModules();
    this.loadDomainEventSubscribersModule();
  }

  bindRepoRegistry(repoRegistry: IRepoRegistry) {
    this.bind(RepoRegistryToken).toConstantValue(repoRegistry);
  }

  bindAppCommandBus() {
    this.bind(AppCommandBusToken).to(AppCommandBus).inSingletonScope();
  }

  loadCommandHandlerModules() {
    const commandHandlerModules = [
      UserCommandHandlerModule,
      FolderCommandHandlerModule,
      PersonalChatCommandHandlerModule,
    ];

    commandHandlerModules.forEach((module) => this.load(module));

    this.registerCommandHandlers();
  }

  registerCommandHandlers() {
    this.commandBus().registerHandlers(this.commandHandlers());
  }

  loadDomainEventSubscribersModule() {
    this.load(DomainEventSubscribersModule);

    this.registerDomainEventSubscribers();
  }

  registerDomainEventSubscribers() {
    this.domainEventSubscribers().forEach((eventSubscriber) => {
      this.domainEventSubscriberRegistry.registerSubscriber(eventSubscriber);
    });
  }

  domainEventSubscribers() {
    return this.getAll<IEventSubscriber>(DomainEventSubscriberToken);
  }

  commandHandlers() {
    return this.getAll<IAppCommandHandler>(CommandHandlerToken);
  }

  commandBus() {
    return this.get<IAppCommandBus>(AppCommandBusToken);
  }

  handleCommand(command: IAppCommand) {
    return this.commandBus().executeCommand(command);
  }

  domainEventPublisher() {
    return new EventPublisher(this.domainEventSubscriberRegistry);
  }

  handleDomainEvent(domainEvent: AnyEvent) {
    console.log("Domain event", domainEvent);

    return this.domainEventPublisher().publish(domainEvent);
  }
}

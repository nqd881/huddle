import { ContainerModule } from "inversify";
import { DomainEventSubscriberToken } from "../app.token";
import { SyncFolderWhenFiltersUpdated } from "./sync-folder-when-filters-updated";
import { SyncFolderWhenChatUpdated } from "./sync-folder-when-chat-updated";
import { SyncFolderWhenFolderCreated } from "./sync-folder-when-folder-created";

export const DomainEventSubscribersModule = new ContainerModule((bind) => {
  bind(DomainEventSubscriberToken)
    .to(SyncFolderWhenFiltersUpdated)
    .inSingletonScope();

  bind(DomainEventSubscriberToken)
    .to(SyncFolderWhenChatUpdated)
    .inSingletonScope();

  bind(DomainEventSubscriberToken)
    .to(SyncFolderWhenFolderCreated)
    .inSingletonScope();
});

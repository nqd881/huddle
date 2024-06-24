import { EventClass, IEventSubscriber } from "ddd-node";
import { IDomainRegistry } from "../../domain/domain";
import { FolderCreated } from "../../domain/models/folder/events/folder-created";

export class CreateFolderItemsWhenFolderCreated
  implements IEventSubscriber<FolderCreated>
{
  constructor(private domainRegistry: IDomainRegistry) {}

  subscribeToEvent(): EventClass<FolderCreated> {
    return FolderCreated;
  }

  async handleEvent(event: FolderCreated): Promise<void> {
    console.log("Handling FolderCreated event");
  }
}

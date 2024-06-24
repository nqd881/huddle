import { IDomainRegistry } from "../../../domain/domain";
import { IAppCommandBus } from "../../base/app-command";
import { AppServiceBase } from "../app-service.base";
import { CreateFolderCommand, CreateFolderHandler } from "./create-folder";
import { PinChatCommand, PinChatHandler } from "./pin-chat";
import { RemoveFolderCommand, RemoveFolderHandler } from "./remove-folder";
import { RenameFolderCommand, RenameFolderHandler } from "./rename-folder";
import {
  SetFolderFiltersCommand,
  SetFolderFiltersHandler,
} from "./set-folder-filters";
import { UnpinChatCommand, UnpinChatHandler } from "./unpin-chat";

export class FolderAppService extends AppServiceBase {
  constructor(commandBus: IAppCommandBus, domainRegistry: IDomainRegistry) {
    super(commandBus);

    this.commandBus.registerHandlers([
      new CreateFolderHandler(domainRegistry),
      new RenameFolderHandler(domainRegistry),
      new PinChatHandler(domainRegistry),
      new UnpinChatHandler(domainRegistry),
      new SetFolderFiltersHandler(domainRegistry),
      new RemoveFolderHandler(domainRegistry),
    ]);
  }

  createFolder = this.buildService<CreateFolderCommand>();
  renameFolder = this.buildService<RenameFolderCommand>();
  pinChat = this.buildService<PinChatCommand>();
  unpinChat = this.buildService<UnpinChatCommand>();
  setFolderFilter = this.buildService<SetFolderFiltersCommand>();
  removeFolder = this.buildService<RemoveFolderCommand>();
}

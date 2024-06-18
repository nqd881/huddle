import { IFolderItemRepo } from "../../../domain/repositories/folder-item.repo";
import { IFolderRepo } from "../../../domain/repositories/folder.repo";
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
  constructor(
    commandBus: IAppCommandBus,
    private folderRepo: IFolderRepo,
    private folderItemRepo: IFolderItemRepo
  ) {
    super(commandBus);

    this.commandBus.registerHandlers([
      new CreateFolderHandler(this.folderRepo),
      new RenameFolderHandler(this.folderRepo),
      new PinChatHandler(this.folderRepo, this.folderItemRepo),
      new UnpinChatHandler(this.folderRepo, this.folderItemRepo),
      new SetFolderFiltersHandler(this.folderRepo),
      new RemoveFolderHandler(this.folderRepo),
    ]);
  }

  createFolder = this.buildService<CreateFolderCommand>();
  renameFolder = this.buildService<RenameFolderCommand>();
  pinChat = this.buildService<PinChatCommand>();
  unpinChat = this.buildService<UnpinChatCommand>();
  setFolderFilter = this.buildService<SetFolderFiltersCommand>();
  removeFolder = this.buildService<RemoveFolderCommand>();
}

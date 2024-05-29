import { IFolderRepo } from "../../../domain/repositories/folder.repo";
import { IAppCommandBus } from "../../base/app-command";
import { AppServiceBase } from "../app-service.base";
import { CreateFolderCommand, CreateFolderHandler } from "./create-folder";
import { PinChatCommand, PinChatHandler } from "./pin-chat";
import { RemoveFolderCommand, RemoveFolderHandler } from "./remove-folder";
import { RenameFolderCommand, RenameFolderHandler } from "./rename-folder";
import {
  SetFolderFilterCommand,
  SetFolderFilterHandler,
} from "./set-folder-filter";
import { UnpinChatCommand, UnpinChatHandler } from "./unpin-chat";

export class FolderAppService extends AppServiceBase {
  constructor(commandBus: IAppCommandBus, private folderRepo: IFolderRepo) {
    super(commandBus);

    this.commandBus.registerHandlers([
      new CreateFolderHandler(this.folderRepo),
      new RenameFolderHandler(this.folderRepo),
      new PinChatHandler(this.folderRepo),
      new UnpinChatHandler(this.folderRepo),
      new SetFolderFilterHandler(this.folderRepo),
      new RemoveFolderHandler(this.folderRepo),
    ]);
  }

  createFolder = this.buildService(CreateFolderCommand);
  renameFolder = this.buildService(RenameFolderCommand);
  pinChat = this.buildService(PinChatCommand);
  unpinChat = this.buildService(UnpinChatCommand);
  setFolderFilter = this.buildService(SetFolderFilterCommand);
  removeFolder = this.buildService(RemoveFolderCommand);
}

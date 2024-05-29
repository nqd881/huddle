import { IFolderRepo } from "../../../domain/repositories/folder.repo";
import {
  AppCommand,
  IAppCommand,
  IAppCommandBus,
  PayloadOf,
} from "../../base/app-command";
import { Type } from "../../utils/type";
import {
  CreateFolderCommand,
  CreateFolderCommandPayload,
  CreateFolderHandler,
} from "./create-folder";
import { PinChatCommand, PinChatHandler } from "./pin-chat";
import { RemoveFolderCommand, RemoveFolderHandler } from "./remove-folder";
import {
  RenameFolderCommand,
  RenameFolderCommandPayload,
  RenameFolderHandler,
} from "./rename-folder";
import {
  SetFolderFilterCommand,
  SetFolderFilterHandler,
} from "./set-folder-filter";
import { UnpinChatCommand, UnpinChatHandler } from "./unpin-chat";

export class FolderApplicationService {
  constructor(
    private commandBus: IAppCommandBus,
    private folderRepo: IFolderRepo
  ) {
    this.commandBus.registerHandlers([
      new CreateFolderHandler(this.folderRepo),
      new RenameFolderHandler(this.folderRepo),
      new PinChatHandler(this.folderRepo),
      new UnpinChatHandler(this.folderRepo),
      new SetFolderFilterHandler(this.folderRepo),
      new RemoveFolderHandler(this.folderRepo),
    ]);
  }

  private _build<T extends AppCommand>(commandType: Type<T>) {
    return (payload: PayloadOf<T>) => {
      const command = new commandType(payload);

      return this.commandBus.executeCommand(command);
    };
  }

  createFolder = this._build(CreateFolderCommand);
  renameFolder = this._build(RenameFolderCommand);
  pinChat = this._build(PinChatCommand);
  unpinChat = this._build(UnpinChatCommand);
  setFolderFilter = this._build(SetFolderFilterCommand);
  removeFolder = this._build(RemoveFolderCommand);
}

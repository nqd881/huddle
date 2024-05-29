import { Id } from "ddd-node";
import { IFolderRepo } from "../../../../domain/repositories/folder.repo";
import { IAppCommandHandler } from "../../../base/app-command";
import { Type } from "../../../utils/type";
import { RemoveFolderCommand } from "./command";

export class RemoveFolderHandler
  implements IAppCommandHandler<RemoveFolderCommand>
{
  constructor(private folderRepo: IFolderRepo) {}

  commandType(): Type<RemoveFolderCommand> {
    return RemoveFolderCommand;
  }

  async handleCommand(command: RemoveFolderCommand): Promise<void> {
    const { payload } = command;

    const folderId = new Id(payload.folderId);

    return this.folderRepo.delete(folderId);
  }
}

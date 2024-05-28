import { Id } from "ddd-node";
import { IFolderRepo } from "../../../../domain/repositories/folder.repo";
import { RenameFolderCommand } from "./command";
import { FolderError } from "../folder-error";
import { IAppCommandHandler } from "../../../base/app-command.base";

export class RenameFolderHandler
  implements IAppCommandHandler<RenameFolderCommand>
{
  constructor(private readonly folderRepo: IFolderRepo) {}

  commandType() {
    return RenameFolderCommand;
  }

  async handleCommand(command: RenameFolderCommand) {
    const { payload } = command;
    const folderId = new Id(payload.folderId);

    const folder = await this.folderRepo.findById(folderId);

    if (!folder) throw new FolderError.FolderNotFound(folderId);

    folder.rename(payload.name);

    return this.folderRepo.save(folder);
  }
}

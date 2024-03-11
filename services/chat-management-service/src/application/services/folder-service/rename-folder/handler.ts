import { Id } from "ddd-node";
import { IFolderRepo } from "../../../../domain/repositories/folder.repo";
import { CommonFolderError } from "../common-folder-error";
import { RenameFolderCommand } from "./command";
import { ICommandHandler } from "../../../interfaces";

export class RenameFolderHandler
  implements ICommandHandler<RenameFolderCommand>
{
  constructor(private readonly folderRepo: IFolderRepo) {}

  commandType() {
    return RenameFolderCommand;
  }

  async handleCommand(command: RenameFolderCommand): Promise<any> {
    const { name } = command;
    const folderId = new Id(command.folderId);

    const folder = await this.folderRepo.findById(folderId);

    if (!folder) throw new CommonFolderError.FolderNotFound(folderId);

    folder.rename(name);

    this.folderRepo.save(folder);
  }
}

import { Id } from "ddd-node";
import { IFolderRepo } from "../../../../domain/repositories/folder.repo";
import { CommonFolderError } from "../common-folder-error";
import { UnpinItemCommand } from "./command";
import { ICommandHandler } from "../../../interfaces";
import { Type } from "../../../interfaces/type";

export class UnpinItemHandler implements ICommandHandler<UnpinItemCommand> {
  constructor(private readonly folderRepo: IFolderRepo) {}

  commandType(): Type<UnpinItemCommand> {
    return UnpinItemCommand;
  }

  async handleCommand(command: UnpinItemCommand): Promise<any> {
    const folderId = new Id(command.folderId);
    const itemId = new Id(command.itemId);

    const folder = await this.folderRepo.findById(folderId);

    if (!folder) throw new CommonFolderError.FolderNotFound(folderId);

    folder.unpinItem(itemId);

    this.folderRepo.save(folder);
  }
}

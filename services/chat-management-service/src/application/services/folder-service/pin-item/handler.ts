import { Id } from "ddd-node";
import { IFolderRepo } from "../../../../domain/repositories/folder.repo";
import { CommonFolderError } from "../common-folder-error";
import { PinItemCommand } from "./command";
import { ICommandHandler } from "../../../interfaces";

export class PinItemHandler implements ICommandHandler<PinItemCommand> {
  constructor(private readonly folderRepo: IFolderRepo) {}

  commandType() {
    return PinItemCommand;
  }

  async handleCommand(command: PinItemCommand): Promise<any> {
    const folderId = new Id(command.folderId);
    const itemId = new Id(command.itemId);

    const folder = await this.folderRepo.findById(folderId);

    if (!folder) throw new CommonFolderError.FolderNotFound(folderId);

    folder.pinItem(itemId);

    this.folderRepo.save(folder);
  }
}

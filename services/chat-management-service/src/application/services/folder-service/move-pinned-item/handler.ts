import { Id } from "ddd-node";
import { Position } from "../../../../domain/models/folder/position";
import { IFolderRepo } from "../../../../domain/repositories/folder.repo";
import { CommonFolderError } from "../common-folder-error";
import { MovePinnedItemCommand } from "./command";
import { ICommandHandler } from "../../../interfaces";
import { Type } from "../../../interfaces/type";

export class MovePinnedItemHandler
  implements ICommandHandler<MovePinnedItemCommand>
{
  constructor(private readonly folderRepo: IFolderRepo) {}

  commandType(): Type<MovePinnedItemCommand> {
    return MovePinnedItemCommand;
  }

  async handleCommand(command: MovePinnedItemCommand): Promise<any> {
    const folderId = new Id(command.folderId);
    const itemId = new Id(command.itemId);
    const destPosition = new Position({ value: command.destPosition });

    const folder = await this.folderRepo.findById(folderId);

    if (!folder) throw new CommonFolderError.FolderNotFound(folderId);

    folder.movePinnedItem(itemId, destPosition);

    this.folderRepo.save(folder);
  }
}

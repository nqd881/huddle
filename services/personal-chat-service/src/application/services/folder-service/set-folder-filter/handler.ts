import { Id } from "ddd-node";
import { SetFolderFilterCommand } from ".";
import { IFolderRepo } from "../../../../domain/repositories/folder.repo";
import { ICommandHandler } from "../../../interfaces";
import { Type } from "../../../interfaces/type";
import { FolderFilter } from "../../../../domain/models/folder/folder-filter";
import { toIds } from "../../../utils/id";
import { FolderError } from "../folder-error";

export class SetFolderFilterHandler
  implements ICommandHandler<SetFolderFilterCommand>
{
  constructor(private folderRepo: IFolderRepo) {}

  commandType(): Type<SetFolderFilterCommand> {
    return SetFolderFilterCommand;
  }

  async handleCommand(command: SetFolderFilterCommand): Promise<any> {
    const {
      includedChatIds,
      includeFriend,
      includeTypes,
      excludedChatIds,
      excludeMuted,
      excludeRead,
      excludeArchived,
    } = command;

    const folderId = new Id(command.folderId);

    const folder = await this.folderRepo.findById(folderId);

    if (!folder) throw new FolderError.FolderNotFound(folderId);
    folder.updateFilter(
      new FolderFilter({
        includedChatIds: toIds(...(includedChatIds || [])),
        includeFriend,
        includeTypes,
        excludedChatIds: toIds(...(excludedChatIds || [])),
        excludeArchived,
        excludeMuted,
        excludeRead,
      })
    );

    this.folderRepo.save(folder);
  }
}

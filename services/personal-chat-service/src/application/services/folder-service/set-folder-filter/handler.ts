import { Id } from "ddd-node";
import { SetFolderFilterCommand } from ".";
import { FolderFilter } from "../../../../domain/models/folder/folder-filter";
import { ChatType } from "../../../../domain/models/personal-chat/chat-type";
import { IFolderRepo } from "../../../../domain/repositories/folder.repo";
import { IAppCommandHandler } from "../../../base/app-command.base";
import { Type } from "../../../interfaces/type";
import { toIds } from "../../../utils/id";
import { FolderError } from "../folder-error";

export class SetFolderFilterHandler
  implements IAppCommandHandler<SetFolderFilterCommand>
{
  constructor(private folderRepo: IFolderRepo) {}

  commandType(): Type<SetFolderFilterCommand> {
    return SetFolderFilterCommand;
  }

  async handleCommand(command: SetFolderFilterCommand) {
    const { payload } = command;

    const {
      includedChatIds,
      includeFriend,
      includeTypes,
      excludedChatIds,
      excludeMuted,
      excludeRead,
      excludeArchived,
    } = payload;

    const folderId = new Id(payload.folderId);

    const folder = await this.folderRepo.findById(folderId);

    if (!folder) throw new FolderError.FolderNotFound(folderId);

    folder.updateFilter(
      new FolderFilter({
        includedChatIds: toIds(includedChatIds || []),
        includeFriend,
        includeTypes: includeTypes?.map((includeType) =>
          ChatType.parse(includeType)
        ),
        excludedChatIds: toIds(excludedChatIds || []),
        excludeArchived,
        excludeMuted,
        excludeRead,
      })
    );

    return this.folderRepo.save(folder);
  }
}

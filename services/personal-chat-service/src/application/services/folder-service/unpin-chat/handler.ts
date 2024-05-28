import { Id } from "ddd-node";
import { IFolderRepo } from "../../../../domain/repositories/folder.repo";
import { Type } from "../../../interfaces/type";
import { UnpinChatCommand } from ".";
import { FolderError } from "../folder-error";
import { IAppCommandHandler } from "../../../base/app-command.base";

export class UnpinChatHandler implements IAppCommandHandler<UnpinChatCommand> {
  constructor(private folderRepo: IFolderRepo) {}

  commandType(): Type<UnpinChatCommand> {
    return UnpinChatCommand;
  }

  async handleCommand(command: UnpinChatCommand): Promise<any> {
    const { payload } = command;

    const folderId = new Id(payload.folderId);
    const chatId = new Id(payload.chatId);

    const folder = await this.folderRepo.findById(folderId);

    if (!folder) throw new FolderError.FolderNotFound(folderId);

    folder.unpinChat(chatId);

    this.folderRepo.save(folder);
  }
}

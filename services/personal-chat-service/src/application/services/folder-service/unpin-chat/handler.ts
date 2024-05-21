import { Id } from "ddd-node";
import { IFolderRepo } from "../../../../domain/repositories/folder.repo";
import { ICommandHandler } from "../../../interfaces";
import { Type } from "../../../interfaces/type";
import { UnpinChatCommand } from ".";
import { FolderError } from "../folder-error";

export class UnpinChatHandler implements ICommandHandler<UnpinChatCommand> {
  constructor(private folderRepo: IFolderRepo) {}

  commandType(): Type<UnpinChatCommand> {
    return UnpinChatCommand;
  }

  async handleCommand(command: UnpinChatCommand): Promise<any> {
    const folderId = new Id(command.folderId);
    const chatId = new Id(command.chatId);

    const folder = await this.folderRepo.findById(folderId);

    if (!folder) throw new FolderError.FolderNotFound(folderId);

    folder.unpinChat(chatId);

    this.folderRepo.save(folder);
  }
}

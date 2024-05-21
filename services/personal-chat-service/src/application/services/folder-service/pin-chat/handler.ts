import { Id } from "ddd-node";
import { PinChatCommand } from ".";
import { IFolderRepo } from "../../../../domain/repositories/folder.repo";
import { ICommandHandler } from "../../../interfaces";
import { Type } from "../../../interfaces/type";
import { FolderError } from "../folder-error";

export class PinChatHandler implements ICommandHandler<PinChatCommand> {
  constructor(private folderRepo: IFolderRepo) {}

  commandType(): Type<PinChatCommand> {
    return PinChatCommand;
  }

  async handleCommand(command: PinChatCommand): Promise<any> {
    const folderId = new Id(command.folderId);
    const chatId = new Id(command.chatId);

    const folder = await this.folderRepo.findById(folderId);

    if (!folder) throw new FolderError.FolderNotFound(folderId);

    folder.pinChat(chatId);

    this.folderRepo.save(folder);
  }
}

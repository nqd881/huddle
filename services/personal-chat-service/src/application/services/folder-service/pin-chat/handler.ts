import { Id } from "ddd-node";
import { PinChatCommand } from ".";
import { IFolderRepo } from "../../../../domain/repositories/folder.repo";
import { Type } from "../../../interfaces/type";
import { FolderError } from "../folder-error";
import { IAppCommandHandler } from "../../../base/app-command.base";

export class PinChatHandler implements IAppCommandHandler<PinChatCommand> {
  constructor(private folderRepo: IFolderRepo) {}

  commandType(): Type<PinChatCommand> {
    return PinChatCommand;
  }

  async handleCommand(command: PinChatCommand) {
    const { payload } = command;

    const folderId = new Id(payload.folderId);
    const chatId = new Id(payload.chatId);

    const folder = await this.folderRepo.findById(folderId);

    if (!folder) throw new FolderError.FolderNotFound(folderId);

    folder.pinChat(chatId);

    return this.folderRepo.save(folder);
  }
}

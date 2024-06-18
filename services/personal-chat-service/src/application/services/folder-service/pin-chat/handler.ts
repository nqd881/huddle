import { Id } from "ddd-node";
import { PinChatCommand } from ".";
import { IFolderRepo } from "../../../../domain/repositories/folder.repo";
import { Type } from "../../../utils/type";
import { FolderError } from "../folder-error";
import { IAppCommandHandler } from "../../../base/app-command";
import { IFolderItemRepo } from "../../../../domain/repositories/folder-item.repo";

export class PinChatHandler implements IAppCommandHandler<PinChatCommand> {
  constructor(
    private folderRepo: IFolderRepo,
    private folderItemRepo: IFolderItemRepo
  ) {}

  commandType(): Type<PinChatCommand> {
    return PinChatCommand;
  }

  async handleCommand(command: PinChatCommand) {
    const { payload } = command;

    const folderId = new Id(payload.folderId);
    const chatId = new Id(payload.chatId);

    const folderStatus = await this.folderRepo.getFolderStatus(folderId);
    const folderItem = await this.folderItemRepo.findInFolder(folderId, chatId);

    if (!folderStatus) throw new Error("Folder status not found");
    if (!folderItem) throw new Error("Folder item not found");

    folderItem.pin(folderStatus);

    await this.folderItemRepo.save(folderItem);

    // const folder = await this.folderRepo.findById(folderId);

    // if (!folder) throw new FolderError.FolderNotFound(folderId);

    // folder.pinChat(chatId);

    // return this.folderRepo.save(folder);
  }
}

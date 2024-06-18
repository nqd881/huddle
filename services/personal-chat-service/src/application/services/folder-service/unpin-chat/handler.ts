import { Id } from "ddd-node";
import { UnpinChatCommand } from ".";
import { IFolderItemRepo } from "../../../../domain/repositories/folder-item.repo";
import { IFolderRepo } from "../../../../domain/repositories/folder.repo";
import { IAppCommandHandler } from "../../../base/app-command";
import { Type } from "../../../utils/type";

export class UnpinChatHandler implements IAppCommandHandler<UnpinChatCommand> {
  constructor(
    private folderRepo: IFolderRepo,
    private folderItemRepo: IFolderItemRepo
  ) {}

  commandType(): Type<UnpinChatCommand> {
    return UnpinChatCommand;
  }

  async handleCommand(command: UnpinChatCommand): Promise<any> {
    const { payload } = command;

    const folderId = new Id(payload.folderId);
    const chatId = new Id(payload.chatId);

    const folderStatus = await this.folderRepo.getFolderStatus(folderId);
    const folderItem = await this.folderItemRepo.findInFolder(folderId, chatId);

    if (!folderStatus) throw new Error("Folder status not found");
    if (!folderItem) throw new Error("Folder item not found");

    folderItem.unpin(folderStatus);

    await this.folderItemRepo.save(folderItem);
  }
}

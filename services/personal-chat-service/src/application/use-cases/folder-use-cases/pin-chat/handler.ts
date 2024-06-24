import { Id } from "ddd-node";
import { PinChatCommand } from ".";
import { IDomainRegistry } from "../../../../domain/domain";
import { IAppCommandHandler } from "../../../base/app-command";
import { Type } from "../../../utils/type";

export class PinChatHandler implements IAppCommandHandler<PinChatCommand> {
  constructor(private readonly domainRegsitry: IDomainRegistry) {}

  commandType(): Type<PinChatCommand> {
    return PinChatCommand;
  }

  async handleCommand(command: PinChatCommand) {
    const { payload } = command;

    const folderId = new Id(payload.folderId);
    const chatId = new Id(payload.chatId);

    const folderStatus = await this.domainRegsitry
      .folderRepo()
      .getFolderStatus(folderId);
    const folderItem = await this.domainRegsitry
      .folderItemRepo()
      .findInFolder(folderId, chatId);

    if (!folderStatus) throw new Error("Folder status not found");
    if (!folderItem) throw new Error("Folder item not found");

    folderItem.pin(folderStatus);

    await this.domainRegsitry.folderItemRepo().save(folderItem);

    // const folder = await this.folderRepo.findById(folderId);

    // if (!folder) throw new FolderError.FolderNotFound(folderId);

    // folder.pinChat(chatId);

    // return this.folderRepo.save(folder);
  }
}

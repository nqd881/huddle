import { Id } from "ddd-node";
import { UnpinChatCommand } from ".";
import { IDomainRegistry } from "../../../../domain/domain";
import { IAppCommandHandler } from "../../../base/app-command";
import { Type } from "../../../utils/type";

export class UnpinChatHandler implements IAppCommandHandler<UnpinChatCommand> {
  constructor(private readonly domainRegistry: IDomainRegistry) {}

  commandType(): Type<UnpinChatCommand> {
    return UnpinChatCommand;
  }

  async handleCommand(command: UnpinChatCommand): Promise<any> {
    const { payload } = command;

    const folderId = new Id(payload.folderId);
    const chatId = new Id(payload.chatId);

    const folderStatus = await this.domainRegistry
      .folderRepo()
      .getFolderStatus(folderId);

    const folderItem = await this.domainRegistry
      .folderItemRepo()
      .findInFolder(folderId, chatId);

    if (!folderStatus) throw new Error("Folder status not found");
    if (!folderItem) throw new Error("Folder item not found");

    folderItem.unpin(folderStatus);

    await this.domainRegistry.folderItemRepo().save(folderItem);
  }
}

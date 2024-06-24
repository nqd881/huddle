import { Id } from "ddd-node";
import { IDomainRegistry } from "../../../../domain/domain";
import { IAppCommandHandler } from "../../../base/app-command";
import { FolderError } from "../folder-error";
import { RenameFolderCommand } from "./command";

export class RenameFolderHandler
  implements IAppCommandHandler<RenameFolderCommand>
{
  constructor(private readonly domainRegistry: IDomainRegistry) {}

  commandType() {
    return RenameFolderCommand;
  }

  async handleCommand(command: RenameFolderCommand) {
    const { payload } = command;
    const folderId = new Id(payload.folderId);

    const folder = await this.domainRegistry.folderRepo().findById(folderId);

    if (!folder) throw new FolderError.FolderNotFound(folderId);

    folder.rename(payload.name);

    return this.domainRegistry.folderRepo().save(folder);
  }
}

import { Id } from "ddd-node";
import { IDomainRegistry } from "../../../../domain/domain";
import { IAppCommandHandler } from "../../../base/app-command";
import { Type } from "../../../utils/type";
import { RemoveFolderCommand } from "./command";

export class RemoveFolderHandler
  implements IAppCommandHandler<RemoveFolderCommand>
{
  constructor(private readonly domainRegistry: IDomainRegistry) {}

  commandType(): Type<RemoveFolderCommand> {
    return RemoveFolderCommand;
  }

  async handleCommand(command: RemoveFolderCommand): Promise<void> {
    const { payload } = command;

    const folderId = new Id(payload.folderId);

    return this.domainRegistry.folderRepo().delete(folderId);
  }
}

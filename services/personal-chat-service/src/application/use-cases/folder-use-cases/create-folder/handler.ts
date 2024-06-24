import { Id } from "ddd-node";
import { v4 } from "uuid";
import { IDomainRegistry } from "../../../../domain/domain";
import { Folder } from "../../../../domain/models/folder/folder";
import { IAppCommandHandler } from "../../../base/app-command";
import { Type } from "../../../utils/type";
import { CreateFolderCommand } from "./command";

export class CreateFolderHandler
  implements IAppCommandHandler<CreateFolderCommand>
{
  constructor(private readonly domainRegistry: IDomainRegistry) {}

  commandType(): Type<CreateFolderCommand> {
    return CreateFolderCommand;
  }

  async handleCommand(command: CreateFolderCommand) {
    const { payload } = command;

    // if (!command.userId) throw new Error("Lack of user id");

    const newFolder = Folder.create({
      ownerUserId: new Id(command?.userId || v4()),
      name: payload.name,
    });

    await this.domainRegistry.folderRepo().save(newFolder);
  }
}

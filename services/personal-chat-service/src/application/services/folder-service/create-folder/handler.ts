import { Id } from "ddd-node";
import { Folder } from "../../../../domain/models/folder/folder";
import { IFolderRepo } from "../../../../domain/repositories/folder.repo";
import { IAppCommandHandler } from "../../../base/app-command.base";
import { Type } from "../../../interfaces/type";
import { CreateFolderCommand } from "./command";

export class CreateFolderHandler
  implements IAppCommandHandler<CreateFolderCommand>
{
  constructor(private readonly folderRepo: IFolderRepo) {}

  commandType(): Type<CreateFolderCommand> {
    return CreateFolderCommand;
  }

  async handleCommand(command: CreateFolderCommand) {
    const { payload } = command;

    if (!command.userId) throw new Error("Lack of user id");

    const newFolder = Folder.create({
      ownerUserId: new Id(command.userId),
      name: payload.name,
    });

    await this.folderRepo.save(newFolder);
  }
}

import { Id } from "ddd-node";
import { Folder } from "../../../../domain/models/folder/folder";
import { SelectionList } from "../../../../domain/models/folder/selection-list";
import { IFolderRepo } from "../../../../domain/repositories/folder.repo";
import { CreateFolderCommand } from "./command";
import { ICommandHandler } from "../../../interfaces";
import { Type } from "../../../interfaces/type";

export class CreateFolderHandler
  implements ICommandHandler<CreateFolderCommand>
{
  constructor(private readonly folderRepo: IFolderRepo) {}

  commandType(): Type<CreateFolderCommand> {
    return CreateFolderCommand;
  }

  async handleCommand(command: CreateFolderCommand): Promise<any> {
    const newFolder = Folder.create({
      ownerUserId: new Id(command.userId),
      name: command.name,
      includedSelections: SelectionList.fromArray(),
      excludedSelections: SelectionList.fromArray(),
    });

    this.folderRepo.save(newFolder);
  }
}

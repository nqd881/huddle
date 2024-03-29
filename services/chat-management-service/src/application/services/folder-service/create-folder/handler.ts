import { Id } from "ddd-node";
import { Folder } from "../../../../domain/models/folder/folder";
import { IFolderRepo } from "../../../../domain/repositories/folder.repo";
import { CreateFolderCommand } from "./command";
import { ICommandHandler } from "../../../interfaces";
import { Type } from "../../../interfaces/type";
import { v4 } from "uuid";

export class CreateFolderHandler
  implements ICommandHandler<CreateFolderCommand>
{
  constructor(private readonly folderRepo: IFolderRepo, private id = v4()) {}

  commandType(): Type<CreateFolderCommand> {
    return CreateFolderCommand;
  }

  async handleCommand(command: CreateFolderCommand): Promise<any> {
    const family = await this.folderRepo.findById(
      new Id("d962d028-6957-4067-8a4f-0da2f03fd394")
    );

    console.log(family);

    // const newFolder = Folder.create({
    //   ownerUserId: new Id(command.userId),
    //   name: command.name,
    // });

    // this.folderRepo.save(newFolder);
  }
}

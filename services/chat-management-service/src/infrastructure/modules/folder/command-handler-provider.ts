import { Inject } from "@nestjs/common";
import { CommandHandlerProvider } from "../command-bus/decorator";
import { ICommandHandlerProvider } from "../command-bus/interface";
import { Repository } from "../repository/token";
import { IFolderRepo } from "../../../domain/repositories/folder.repo";
import { CreateFolderHandler } from "../../../application/services/folder-service/create-folder";
import { RenameFolderHandler } from "../../../application/services/folder-service/rename-folder";

@CommandHandlerProvider
export class FolderCommandHandlerProvider implements ICommandHandlerProvider {
  constructor(@Inject(Repository.Folder) private folderRepo: IFolderRepo) {}

  getCommandHandlers() {
    const { folderRepo } = this;

    return [
      new CreateFolderHandler(folderRepo),
      new RenameFolderHandler(folderRepo),
    ];
  }
}

import { CreateFolderHandler } from "../../../application/services/folder-service/create-folder";
import { PinChatHandler } from "../../../application/services/folder-service/pin-chat";
import { RenameFolderHandler } from "../../../application/services/folder-service/rename-folder";
import { SetFolderFilterHandler } from "../../../application/services/folder-service/set-folder-filter";
import { UnpinChatHandler } from "../../../application/services/folder-service/unpin-chat";
import { CommandHandlerProvider } from "../command-bus/decorator";
import { ICommandHandlerProvider } from "../command-bus/interface";
import { RepositoryService } from "../repository/repository.service";

@CommandHandlerProvider
export class FolderCommandHandlerProvider implements ICommandHandlerProvider {
  constructor(private repoService: RepositoryService) {}

  provideCommandHandlers() {
    const { folderRepo } = this.repoService;

    return [
      new CreateFolderHandler(folderRepo),
      new RenameFolderHandler(folderRepo),
      new PinChatHandler(folderRepo),
      new UnpinChatHandler(folderRepo),
      new SetFolderFilterHandler(folderRepo),
    ];
  }
}

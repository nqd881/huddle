import { Inject } from "@nestjs/common";
import { CreateFolderHandler } from "../../../application/services/folder-service/create-folder";
import { PinChatHandler } from "../../../application/services/folder-service/pin-chat";
import { RenameFolderHandler } from "../../../application/services/folder-service/rename-folder";
import { SetFolderFilterHandler } from "../../../application/services/folder-service/set-folder-filter";
import { UnpinChatHandler } from "../../../application/services/folder-service/unpin-chat";
import { IFolderRepo } from "../../../domain/repositories/folder.repo";
import { CommandHandlerProvider } from "../command-bus/decorator";
import { ICommandHandlerProvider } from "../command-bus/interface";
import { FOLDER_REPO } from "./token";

@CommandHandlerProvider
export class FolderCommandHandlerProvider implements ICommandHandlerProvider {
  constructor(@Inject(FOLDER_REPO) private folderRepo: IFolderRepo) {}

  provideCommandHandlers() {
    const { folderRepo } = this;

    return [
      new CreateFolderHandler(folderRepo),
      new RenameFolderHandler(folderRepo),
      new PinChatHandler(folderRepo),
      new UnpinChatHandler(folderRepo),
      new SetFolderFilterHandler(folderRepo),
    ];
  }
}

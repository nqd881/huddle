import { CommandHandlerModule } from "../command-handler-module";
import { PinChatHandler } from "./pin-chat";
import { RemoveFolderHandler } from "./remove-folder";
import { RenameFolderHandler } from "./rename-folder";
import { SetFolderFiltersHandler } from "./set-folder-filters";
import { UnpinChatHandler } from "./unpin-chat";

export const FolderCommandHandlerModule = new CommandHandlerModule([
  PinChatHandler,
  RemoveFolderHandler,
  RenameFolderHandler,
  SetFolderFiltersHandler,
  UnpinChatHandler,
]);

import { CommandHandlerModule } from "../command-handler-module";
import { CreateFolderHandler } from "./create-folder";
import { CreateUserHandler } from "./create-user";

export const UserCommandHandlerModule = new CommandHandlerModule([
  CreateUserHandler,
  CreateFolderHandler,
]);

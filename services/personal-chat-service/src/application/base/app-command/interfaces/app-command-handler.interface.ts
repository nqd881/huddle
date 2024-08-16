import { Type } from "../../../utils/type";
import { IAppCommand } from "./app-command.interface";

export interface IAppCommandHandler<T extends IAppCommand = IAppCommand> {
  commandType(): Type<T>;

  handleCommand(command: T): Promise<void>;
}

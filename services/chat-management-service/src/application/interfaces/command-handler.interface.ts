import { Type } from "./type";
import { ICommand } from "./command.interface";

export interface ICommandHandler<T extends ICommand = ICommand, R = any> {
  commandType(): Type<T>;

  handleCommand(command: T): Promise<R>;
}

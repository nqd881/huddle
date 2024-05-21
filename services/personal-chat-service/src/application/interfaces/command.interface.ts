import { Type } from "./type";

export interface ICommand {}
export interface ICommandHandler<T extends ICommand = ICommand, R = any> {
  commandType(): Type<T>;

  handleCommand(command: T): Promise<R>;
}

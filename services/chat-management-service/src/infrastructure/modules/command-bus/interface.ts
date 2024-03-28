import { ICommand, ICommandHandler } from "../../../application/interfaces";

export interface ICommandBus<CommandBase extends ICommand = ICommand> {
  registerHandler<T extends CommandBase>(handler: ICommandHandler<T>): void;

  registerHandlers(handlers: ICommandHandler[]): void;

  executeCommand<T extends CommandBase>(command: T): Promise<any>;
}

export interface ICommandHandlerProvider {
  getCommandHandlers(): ICommandHandler[];
}

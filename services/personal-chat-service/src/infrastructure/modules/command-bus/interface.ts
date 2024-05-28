import {
  IAppCommandBase,
  IAppCommandHandler,
} from "../../../application/base/app-command.base";

export interface ICommandBus<
  CommandBase extends IAppCommandBase = IAppCommandBase
> {
  registerHandler<T extends CommandBase>(handler: IAppCommandHandler<T>): void;

  registerHandlers(handlers: IAppCommandHandler<CommandBase>[]): void;

  executeCommand<T extends CommandBase>(command: T): Promise<void>;
}

export interface ICommandHandlerProvider {
  provideCommandHandlers(): IAppCommandHandler[];
}

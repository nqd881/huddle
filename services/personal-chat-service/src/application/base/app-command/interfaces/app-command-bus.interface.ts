import { IAppCommandHandler } from "./app-command-handler.interface";
import { IAppCommand } from "./app-command.interface";

export interface IAppCommandBus {
  registerHandler(handler: IAppCommandHandler): void;
  registerHandlers(handlers: IAppCommandHandler[]): void;
  executeCommand(command: IAppCommand): Promise<void>;
}

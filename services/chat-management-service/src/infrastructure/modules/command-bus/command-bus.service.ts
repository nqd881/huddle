import { Inject, Injectable, Type } from "@nestjs/common";
import { ICommand, ICommandHandler } from "../../../application/interfaces";
import { COMMAND_HANDLERS } from "./token";

@Injectable()
export class CommandBusService {
  private _handlerMap: Map<Type<ICommand>, ICommandHandler> = new Map();

  constructor(@Inject(COMMAND_HANDLERS) commandHandlers: ICommandHandler[]) {
    this.registerHandlers(commandHandlers);
  }

  registerHandlers(handlers: ICommandHandler[]) {
    handlers.forEach((handler) => {
      this.registerHandler(handler);
    });
  }

  registerHandler(handler: ICommandHandler) {
    this._handlerMap.set(handler.commandType(), handler);
  }

  getCommandHandler<T extends ICommand>(commandType: Type<T>) {
    const handler = this._handlerMap.get(commandType);

    if (!handler) throw new Error("Handler not found");

    return handler as ICommandHandler<T>;
  }

  executeCommand<T extends ICommand>(command: T) {
    const commandType: Type<T> = Object.getPrototypeOf(command).constructor;

    const handler = this.getCommandHandler(commandType);

    return handler.handleCommand(command);
  }
}

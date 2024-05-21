import { Inject, Injectable, Optional, Type } from "@nestjs/common";
import { ICommand, ICommandHandler } from "../../../application/interfaces";
import { COMMAND_HANDLERS } from "./token";
import { ICommandBus } from "./interface";

@Injectable()
export class CommandBus<CommandBase extends ICommand = ICommand>
  implements ICommandBus<CommandBase>
{
  private _handlersMap: Map<Type<CommandBase>, ICommandHandler<CommandBase>> =
    new Map();

  constructor(
    @Optional()
    @Inject(COMMAND_HANDLERS)
    commandHandlers: ICommandHandler<CommandBase>[] = []
  ) {
    this.registerHandlers(commandHandlers);
  }

  registerHandlers<T extends CommandBase>(handlers: ICommandHandler<T>[]) {
    handlers.forEach((handler) => {
      this.registerHandler(handler);
    });
  }

  registerHandler<T extends CommandBase>(handler: ICommandHandler<T>) {
    this._handlersMap.set(handler.commandType(), handler);
  }

  protected getCommandHandler<T extends CommandBase>(commandType: Type<T>) {
    const handler = this._handlersMap.get(commandType);

    if (!handler) throw new Error("Handler not found");

    return handler as ICommandHandler<T>;
  }

  executeCommand<T extends CommandBase>(command: T) {
    const commandType: Type<T> = Object.getPrototypeOf(command).constructor;

    const handler = this.getCommandHandler(commandType);

    return handler.handleCommand(command);
  }
}

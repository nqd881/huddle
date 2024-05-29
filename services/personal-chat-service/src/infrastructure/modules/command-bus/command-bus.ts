import { Inject, Injectable, Optional, Type } from "@nestjs/common";
// import { ICommandBus } from "./interface";
import { COMMAND_BUS_HOOKS, COMMAND_HANDLERS } from "./token";
import {
  IAppCommand,
  IAppCommandBus,
  IAppCommandHandler,
} from "../../../application/base/app-command";
import { CommandBusHookHandlerMap, CommandBusHookManager } from "./hook";

@Injectable()
export class CommandBus<CommandBase extends IAppCommand = IAppCommand>
  implements IAppCommandBus
{
  private _handlersMap: Map<
    Type<CommandBase>,
    IAppCommandHandler<CommandBase>
  > = new Map();

  private _hookManager: CommandBusHookManager = new CommandBusHookManager();

  constructor(
    @Optional()
    @Inject(COMMAND_HANDLERS)
    handlers: IAppCommandHandler<CommandBase>[] = [],
    @Optional()
    @Inject(COMMAND_BUS_HOOKS)
    hookHandlerMap: CommandBusHookHandlerMap = {}
  ) {
    this.registerHandlers(handlers);

    this._hookManager.addHookHandlers(hookHandlerMap);
  }

  registerHandlers<T extends CommandBase>(handlers: IAppCommandHandler<T>[]) {
    handlers.forEach((handler) => {
      this.registerHandler(handler);
    });
  }

  registerHandler<T extends CommandBase>(handler: IAppCommandHandler<T>) {
    this._hookManager.runSync("beforeRegisterHandler", handler);

    this._handlersMap.set(handler.commandType(), handler);

    this._hookManager.runSync("afterRegisterHandler", handler);
  }

  protected getCommandHandler<T extends CommandBase>(commandType: Type<T>) {
    const handler = this._handlersMap.get(commandType);

    if (!handler) throw new Error("Handler not found");

    return handler as IAppCommandHandler<T>;
  }

  async executeCommand<T extends CommandBase>(command: T) {
    await this._hookManager.runAsync("beforeExecute", command);

    const commandType = command.constructor as Type<T>;

    const handler = this.getCommandHandler(commandType);

    await handler.handleCommand(command);

    await this._hookManager.runAsync("afterExecute", command);
  }
}

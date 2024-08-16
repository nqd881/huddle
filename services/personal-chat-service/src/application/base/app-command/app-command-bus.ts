import { injectable } from "inversify";
import { Type } from "../../utils/type";
import { IAppCommand, IAppCommandBus, IAppCommandHandler } from "./interfaces";

@injectable()
export class AppCommandBus implements IAppCommandBus {
  private handlersMap: Map<Type<IAppCommand>, IAppCommandHandler> = new Map();

  registerHandler(handler: IAppCommandHandler): void {
    this.handlersMap.set(handler.commandType(), handler);
  }

  registerHandlers(handlers: IAppCommandHandler[]): void {
    handlers.forEach((handler) => {
      this.registerHandler(handler);
    });
  }

  async executeCommand(command: IAppCommand): Promise<void> {
    const commandType = command.constructor as Type<IAppCommand>;

    const handler = this.handlersMap.get(commandType);

    if (!handler) throw new Error("Command handler not found");

    await handler.handleCommand(command);
  }
}

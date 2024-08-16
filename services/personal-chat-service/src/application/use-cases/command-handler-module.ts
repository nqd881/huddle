import { ContainerModule, interfaces } from "inversify";
import { IAppCommandHandler } from "../base";
import { Type } from "../utils/type";
import { CommandHandlerToken } from "../app.token";

export class CommandHandlerModule extends ContainerModule {
  constructor(private commandHandlers: Type<IAppCommandHandler>[]) {
    super((...args) => this.callback(...args));
  }

  private callback: interfaces.ContainerModuleCallBack = (bind) => {
    this.commandHandlers.forEach((commandHandler) => {
      bind(CommandHandlerToken).to(commandHandler).inSingletonScope();
    });
  };
}

import { IAppCommand, IAppCommandBus } from "../base/app-command";

export class AppServiceBase {
  constructor(protected commandBus: IAppCommandBus) {}

  protected buildService<T extends IAppCommand>() {
    return (command: T) => {
      return this.commandBus.executeCommand(command);
    };
  }
}

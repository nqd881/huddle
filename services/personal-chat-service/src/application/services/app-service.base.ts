import { IAppCommand, IAppCommandBus } from "../base/app-command";
import { Type } from "../utils/type";

export class AppServiceBase {
  constructor(protected commandBus: IAppCommandBus) {}

  protected buildService<T extends Type<IAppCommand>>(commandType: T) {
    return (...args: ConstructorParameters<T>) => {
      const command = new commandType(...args);

      return this.commandBus.executeCommand(command);
    };
  }
}

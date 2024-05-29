import { IAppCommandHandler } from "../../../application/base/app-command";

export interface IAppCommandHandlerProvider {
  provideCommandHandlers(): IAppCommandHandler[];
}

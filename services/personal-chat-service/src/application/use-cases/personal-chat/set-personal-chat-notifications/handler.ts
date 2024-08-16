import { IRepoRegistry } from "../../../output-ports/repo-registry";
import { IAppCommandHandler } from "../../../base/app-command";
import { Type } from "../../../utils/type";
import { SetPersonalChatNotificationsCommand } from "./command";
import { inject, injectable } from "inversify";
import { RepoRegistryToken } from "../../../app.token";

@injectable()
export class SetPersonalChatNotificationsHandler
  implements IAppCommandHandler<SetPersonalChatNotificationsCommand>
{
  constructor(
    @inject(RepoRegistryToken) private readonly repoRegistry: IRepoRegistry
  ) {}

  commandType(): Type<SetPersonalChatNotificationsCommand> {
    return SetPersonalChatNotificationsCommand;
  }

  async handleCommand(
    command: SetPersonalChatNotificationsCommand
  ): Promise<any> {}
}

import { IDomainRegistry } from "../../../../domain/domain";
import { IAppCommandHandler } from "../../../base/app-command";
import { Type } from "../../../utils/type";
import { SetPersonalChatNotificationsCommand } from "./command";

export class SetPersonalChatNotificationsHandler
  implements IAppCommandHandler<SetPersonalChatNotificationsCommand>
{
  constructor(private readonly domainRegistry: IDomainRegistry) {}

  commandType(): Type<SetPersonalChatNotificationsCommand> {
    return SetPersonalChatNotificationsCommand;
  }

  async handleCommand(
    command: SetPersonalChatNotificationsCommand
  ): Promise<any> {}
}

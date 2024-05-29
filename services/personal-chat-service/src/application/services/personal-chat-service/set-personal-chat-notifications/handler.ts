import { IPersonalChatRepo } from "../../../../domain/repositories/personal-chat.repo";
import { IAppCommandHandler } from "../../../base/app-command";
import { Type } from "../../../utils/type";
import { SetPersonalChatNotificationsCommand } from "./command";

export class SetPersonalChatNotificationsHandler
  implements IAppCommandHandler<SetPersonalChatNotificationsCommand>
{
  constructor(private personalChatRepo: IPersonalChatRepo) {}

  commandType(): Type<SetPersonalChatNotificationsCommand> {
    return SetPersonalChatNotificationsCommand;
  }

  async handleCommand(
    command: SetPersonalChatNotificationsCommand
  ): Promise<any> {}
}

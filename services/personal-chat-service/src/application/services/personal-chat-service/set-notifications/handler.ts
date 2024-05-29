import { IPersonalChatRepo } from "../../../../domain/repositories/personal-chat.repo";
import { IAppCommandHandler } from "../../../base/app-command";
import { Type } from "../../../utils/type";
import { SetNotificationsCommand } from "./command";

export class SetNotificationsHandler
  implements IAppCommandHandler<SetNotificationsCommand>
{
  constructor(private personalChatRepo: IPersonalChatRepo) {}

  commandType(): Type<SetNotificationsCommand> {
    return SetNotificationsCommand;
  }

  async handleCommand(command: SetNotificationsCommand): Promise<any> {}
}

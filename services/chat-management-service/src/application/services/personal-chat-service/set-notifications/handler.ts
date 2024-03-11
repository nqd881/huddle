import { IPersonalChatRepo } from "../../../../domain/repositories/personal-chat.repo";
import { ICommandHandler } from "../../../interfaces";
import { Type } from "../../../interfaces/type";
import { SetNotificationsCommand } from "./command";

export class SetNotificationsHandler
  implements ICommandHandler<SetNotificationsCommand>
{
  constructor(private personalChat: IPersonalChatRepo) {}

  commandType(): Type<SetNotificationsCommand> {
    return SetNotificationsCommand;
  }

  async handleCommand(command: SetNotificationsCommand): Promise<any> {}
}

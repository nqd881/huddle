import { AppCommandBase } from "../../../base/app-command.base";

export interface CreatePersonalChatCommandPayload {
  sourceChatId: string;
  ownerUserId: string;
  type: string;
}

export class CreatePersonalChatCommand extends AppCommandBase<CreatePersonalChatCommandPayload> {}

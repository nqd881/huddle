import { AppCommandBase } from "../../../base/app-command.base";

export interface PinChatCommandPayload {
  folderId: string;
  chatId: string;
}

export class PinChatCommand extends AppCommandBase<PinChatCommandPayload> {}

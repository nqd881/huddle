import { AppCommand } from "../../../base/app-command";

export interface PinChatCommandPayload {
  folderId: string;
  chatId: string;
}

export class PinChatCommand extends AppCommand<PinChatCommandPayload> {}

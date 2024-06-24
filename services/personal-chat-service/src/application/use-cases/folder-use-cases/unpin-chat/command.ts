import { AppCommand } from "../../../base/app-command";

export interface UnpinChatCommandPayload {
  folderId: string;
  chatId: string;
}

export class UnpinChatCommand extends AppCommand<UnpinChatCommandPayload> {}

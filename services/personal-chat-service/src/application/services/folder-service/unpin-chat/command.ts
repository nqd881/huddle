import { AppCommandBase } from "../../../base/app-command";

export interface UnpinChatCommandPayload {
  folderId: string;
  chatId: string;
}

export class UnpinChatCommand extends AppCommandBase<UnpinChatCommandPayload> {}

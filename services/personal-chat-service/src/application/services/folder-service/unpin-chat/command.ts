import { AppCommandBase } from "../../../base/app-command.base";

export interface UnpinChatCommandPayload {
  folderId: string;
  chatId: string;
}

export class UnpinChatCommand extends AppCommandBase<UnpinChatCommandPayload> {}

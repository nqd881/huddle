import { AppCommandBase } from "../../../base/app-command";

export interface MarkPersonalChatAsUnreadCommandPayload {
  personalChatId: string;
}

export class MarkPersonalChatAsUnreadCommand extends AppCommandBase<MarkPersonalChatAsUnreadCommandPayload> {}

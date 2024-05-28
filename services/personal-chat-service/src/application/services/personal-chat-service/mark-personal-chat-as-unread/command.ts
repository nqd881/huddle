import { AppCommandBase } from "../../../base/app-command.base";

export interface MarkPersonalChatAsUnreadCommandPayload {
  personalChatId: string;
}

export class MarkPersonalChatAsUnreadCommand extends AppCommandBase<MarkPersonalChatAsUnreadCommandPayload> {}

import { AppCommand } from "../../../base/app-command";

export interface MarkPersonalChatAsUnreadCommandPayload {
  personalChatId: string;
}

export class MarkPersonalChatAsUnreadCommand extends AppCommand<MarkPersonalChatAsUnreadCommandPayload> {}

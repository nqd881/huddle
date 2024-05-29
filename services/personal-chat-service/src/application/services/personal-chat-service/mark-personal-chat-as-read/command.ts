import { AppCommandBase } from "../../../base/app-command";

export interface MarkPersonalChatAsReadCommandPayload {
  personalChatId: string;
}

export class MarkPersonalChatAsReadCommand extends AppCommandBase<MarkPersonalChatAsReadCommandPayload> {}

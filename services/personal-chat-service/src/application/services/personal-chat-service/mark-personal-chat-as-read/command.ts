import { AppCommandBase } from "../../../base/app-command.base";

export interface MarkPersonalChatAsReadCommandPayload {
  personalChatId: string;
}

export class MarkPersonalChatAsReadCommand extends AppCommandBase<MarkPersonalChatAsReadCommandPayload> {}

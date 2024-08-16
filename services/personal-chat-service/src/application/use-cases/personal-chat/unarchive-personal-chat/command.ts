import { AppCommand } from "../../../base/app-command";

export interface UnarchivePersonalChatCommandPayload {
  personalChatId: string;
}

export class UnarchivePersonalChatCommand extends AppCommand<UnarchivePersonalChatCommandPayload> {}

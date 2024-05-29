import { AppCommandBase } from "../../../base/app-command";

export interface UnarchivePersonalChatCommandPayload {
  personalChatId: string;
}

export class UnarchivePersonalChatCommand extends AppCommandBase<UnarchivePersonalChatCommandPayload> {}

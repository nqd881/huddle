import { AppCommandBase } from "../../../base/app-command.base";

export interface UnarchivePersonalChatCommandPayload {
  personalChatId: string;
}

export class UnarchivePersonalChatCommand extends AppCommandBase<UnarchivePersonalChatCommandPayload> {}

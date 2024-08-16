import { AppCommand } from "../../../base/app-command";

export interface ArchivePersonalChatCommandPayload {
  personalChatId: string;
}

export class ArchivePersonalChatCommand extends AppCommand<ArchivePersonalChatCommandPayload> {}

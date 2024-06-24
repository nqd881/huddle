// export class ArchivePersonalChatCommand {
//   constructor(public readonly personalChatId: string) {}
// }

import { AppCommand } from "../../../base/app-command";

export interface ArchivePersonalChatCommandPayload {
  personalChatId: string;
}

export class ArchivePersonalChatCommand extends AppCommand<ArchivePersonalChatCommandPayload> {}

// export class ArchivePersonalChatCommand {
//   constructor(public readonly personalChatId: string) {}
// }

import { AppCommandBase } from "../../../base/app-command.base";

export interface ArchivePersonalChatCommandPayload {
  personalChatId: string;
}

export class ArchivePersonalChatCommand extends AppCommandBase<ArchivePersonalChatCommandPayload> {}

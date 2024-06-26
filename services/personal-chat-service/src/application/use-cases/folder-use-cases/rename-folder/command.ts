// export class RenameFolderCommand {
//   constructor(public readonly folderId: string, public readonly name: string) {}
// }

import { AppCommand } from "../../../base/app-command";

export interface RenameFolderCommandPayload {
  folderId: string;
  name: string;
}

export class RenameFolderCommand extends AppCommand<RenameFolderCommandPayload> {}

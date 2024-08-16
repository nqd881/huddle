import { AppCommand } from "../../../base/app-command";

export interface RenameFolderCommandPayload {
  folderId: string;
  name: string;
}

export class RenameFolderCommand extends AppCommand<RenameFolderCommandPayload> {}

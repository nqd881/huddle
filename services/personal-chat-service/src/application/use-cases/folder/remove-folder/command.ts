import { AppCommand } from "../../../base/app-command";

export interface RemoveFolderCommandPayload {
  folderId: string;
}

export class RemoveFolderCommand extends AppCommand<RemoveFolderCommandPayload> {}

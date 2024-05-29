import { AppCommandBase } from "../../../base/app-command";

export interface RemoveFolderCommandPayload {
  folderId: string;
}

export class RemoveFolderCommand extends AppCommandBase<RemoveFolderCommandPayload> {}

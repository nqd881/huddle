import { AppCommand } from "../../../base/app-command";

export interface SetFolderFiltersCommandPayload {
  folderId: string;
  includedIds?: string[];
  excludedIds?: string[];
  type?: string;
  muted?: boolean;
  read?: boolean;
  archived?: boolean;
}

export class SetFolderFiltersCommand extends AppCommand<SetFolderFiltersCommandPayload> {}

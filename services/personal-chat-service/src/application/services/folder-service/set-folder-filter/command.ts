import { AppCommandBase } from "../../../base/app-command";

export interface SetFolderFilterCommandPayload {
  folderId: string;
  includedChatIds?: string[];
  includeFriend?: boolean;
  includeTypes?: string[];
  excludedChatIds?: string[];
  excludeMuted?: boolean;
  excludeRead?: boolean;
  excludeArchived?: boolean;
}

export class SetFolderFilterCommand extends AppCommandBase<SetFolderFilterCommandPayload> {}

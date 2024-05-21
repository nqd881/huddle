import { ChatType } from "../../../../domain/models/personal-chat/chat-type";

export class SetFolderFilterCommand {
  constructor(
    public readonly folderId: string,
    public readonly includedChatIds?: string[],
    public readonly includeFriend?: boolean,
    public readonly includeTypes?: ChatType[],
    public readonly excludedChatIds?: string[],
    public readonly excludeMuted?: boolean,
    public readonly excludeRead?: boolean,
    public readonly excludeArchived?: boolean
  ) {}
}

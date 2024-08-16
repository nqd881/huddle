import { Prop } from "ddd-node";
import { ChatDescriptor } from "../../personal-chat/chat-descriptor";
import { FolderFilterBase } from "./folder-filter.base";

export interface ChatArchivedFilterProps {
  archived: boolean;
}

export class ChatArchivedFilter extends FolderFilterBase<ChatArchivedFilterProps> {
  @Prop()
  declare archived: boolean;

  matchesFilter(chatDescriptor: ChatDescriptor): boolean {
    return this.archived == chatDescriptor.isArchived;
  }
}

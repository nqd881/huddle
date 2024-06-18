import { Prop } from "ddd-node";
import { ChatDescriptor } from "../chat-descriptor";
import { FolderFilter } from "./folder-filter";

export interface ChatArchivedFilterProps {
  archived: boolean;
}

export class ChatArchivedFilter extends FolderFilter<ChatArchivedFilterProps> {
  @Prop()
  declare archived: boolean;

  matchesFilter(chatDescriptor: ChatDescriptor): boolean {
    return this.archived == chatDescriptor.isArchived;
  }
}

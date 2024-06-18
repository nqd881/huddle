import { Prop } from "ddd-node";
import { ChatDescriptor } from "../chat-descriptor";
import { FolderFilter } from "./folder-filter";

export interface ChatMutedFilterProps {
  muted: boolean;
}

export class ChatMutedFilter extends FolderFilter<ChatMutedFilterProps> {
  @Prop()
  declare muted: boolean;

  matchesFilter(chatDescriptor: ChatDescriptor): boolean {
    return this.muted === chatDescriptor.isMuted;
  }
}

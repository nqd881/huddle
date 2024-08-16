import { Prop } from "ddd-node";
import { ChatDescriptor } from "../../personal-chat/chat-descriptor";
import { FolderFilterBase } from "./folder-filter.base";

export interface ChatMutedFilterProps {
  muted: boolean;
}

export class ChatMutedFilter extends FolderFilterBase<ChatMutedFilterProps> {
  @Prop()
  declare muted: boolean;

  matchesFilter(chatDescriptor: ChatDescriptor): boolean {
    return this.muted === chatDescriptor.isMuted;
  }
}

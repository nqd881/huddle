import { Prop } from "ddd-node";
import { ChatDescriptor } from "../../personal-chat/chat-descriptor";
import { FolderFilterBase } from "./folder-filter.base";

export interface ChatReadFilterProps {
  read: boolean;
}

export class ChatReadFilter extends FolderFilterBase<ChatReadFilterProps> {
  @Prop()
  declare read: boolean;

  matchesFilter(chatDescriptor: ChatDescriptor): boolean {
    return this.read === chatDescriptor.isRead;
  }
}

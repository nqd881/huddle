import { Prop } from "ddd-node";
import { ChatType } from "../../personal-chat/chat-type";
import { ChatDescriptor } from "../../personal-chat/chat-descriptor";
import { FolderFilterBase } from "./folder-filter.base";

export interface ChatTypeFilterProps {
  type: ChatType;
}

export class ChatTypeFilter extends FolderFilterBase<ChatTypeFilterProps> {
  @Prop()
  declare type: ChatType;

  matchesFilter(chatDescriptor: ChatDescriptor): boolean {
    return this.type === chatDescriptor.type;
  }
}

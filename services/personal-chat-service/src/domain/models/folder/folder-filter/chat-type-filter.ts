import { Prop } from "ddd-node";
import { ChatType } from "../../personal-chat/chat-type";
import { ChatDescriptor } from "../chat-descriptor";
import { FolderFilter } from "./folder-filter";

export interface ChatTypeFilterProps {
  type: ChatType;
}

export class ChatTypeFilter extends FolderFilter<ChatTypeFilterProps> {
  @Prop()
  declare type: ChatType;

  matchesFilter(chatDescriptor: ChatDescriptor): boolean {
    return this.type.equals(chatDescriptor.type);
  }
}

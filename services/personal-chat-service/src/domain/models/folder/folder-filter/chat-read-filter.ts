import { Prop } from "ddd-node";
import { ChatDescriptor } from "../chat-descriptor";
import { FolderFilter } from "./folder-filter";

export interface ChatReadFilterProps {
  read: boolean;
}

export class ChatReadFilter extends FolderFilter<ChatReadFilterProps> {
  @Prop()
  declare read: boolean;

  matchesFilter(chatDescriptor: ChatDescriptor): boolean {
    return this.read === chatDescriptor.isRead;
  }
}

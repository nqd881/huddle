import { Id, Prop } from "ddd-node";
import { ChatDescriptor } from "../../personal-chat/chat-descriptor";
import { FolderFilterBase } from "./folder-filter.base";

export interface ChatIdFilterProps {
  includedIds: Id[];
  excludedIds: Id[];
}

export class ChatIdFilter extends FolderFilterBase<ChatIdFilterProps> {
  @Prop()
  declare includedIds: Id[];

  @Prop()
  declare excludedIds: Id[];

  matchesFilter(chatDescriptor: ChatDescriptor): boolean {
    return (
      this.includedIds.some(
        (includedId) => chatDescriptor.chatId === includedId
      ) ||
      !this.excludedIds.some(
        (excludedId) => chatDescriptor.chatId === excludedId
      )
    );
  }
}

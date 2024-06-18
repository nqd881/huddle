import { Id, Prop } from "ddd-node";
import { ChatDescriptor } from "../chat-descriptor";
import { FolderFilter } from "./folder-filter";

export interface ChatIdFilterProps {
  includedIds: Id[];
  excludedIds: Id[];
}

export class ChatIdFilter extends FolderFilter<ChatIdFilterProps> {
  @Prop()
  declare includedIds: Id[];

  @Prop()
  declare excludedIds: Id[];

  matchesFilter(chatDescriptor: ChatDescriptor): boolean {
    return (
      this.includedIds.some((includedId) =>
        chatDescriptor.chatId.equals(includedId)
      ) ||
      !this.excludedIds.some((excludedId) =>
        chatDescriptor.chatId.equals(excludedId)
      )
    );
  }
}

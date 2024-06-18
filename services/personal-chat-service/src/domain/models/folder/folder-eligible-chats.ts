import { Id, Prop, ValueObjectBase } from "ddd-node";

export interface FolderEligibleChatsProps {
  folderId: Id;
  chatIds: Id[];
}

export class FolderEligibleChats extends ValueObjectBase<FolderEligibleChatsProps> {
  @Prop()
  declare folderId: Id;

  @Prop()
  declare chatIds: Id[];

  isChatEligible(chatId: Id) {
    return this.chatIds.some((_chatId) => _chatId.equals(chatId));
  }
}

import { Id, ValueObjectBase } from "ddd-node";
import { ChatType } from "../personal-chat/chat-type";

export interface FolderFilterProps {
  includedChatIds?: Id[]; // static
  includeFriend?: boolean; // dynamic
  includeTypes?: ChatType[]; // dynamic

  excludedChatIds?: Id[]; // static
  excludeMuted?: boolean; // dynamic
  excludeRead?: boolean; // dynamic
  excludeArchived?: boolean; //dynamic
}

export class FolderFilter extends ValueObjectBase<FolderFilterProps> {}

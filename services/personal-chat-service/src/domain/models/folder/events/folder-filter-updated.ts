import { Event, EventBase, Id } from "ddd-node";
import { ChatType } from "../../personal-chat/chat-type";

export interface FolderFilterUpdatedProps {
  includedIds?: Id[];
  excludedIds?: Id[];
  archived?: boolean;
  muted?: boolean;
  read?: boolean;
  type?: ChatType;
}

@Event("FOLDER_FILTER_UPDATED")
export class FolderFilterUpdated extends EventBase<FolderFilterUpdatedProps> {}

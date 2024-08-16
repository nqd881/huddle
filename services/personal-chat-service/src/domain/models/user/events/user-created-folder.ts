import { Event, EventBase, Id, Model } from "ddd-node";
import { ChatType } from "../../personal-chat/chat-type";

export interface UserCreatedFolderProps {
  userId: Id;
  folderId: Id;
  folderName: string;
  folderFilter: {
    includedIds?: Id[];
    excludedIds?: Id[];
    archived?: boolean;
    muted?: boolean;
    read?: boolean;
    type?: ChatType["value"];
  };
}

@Event("USER_CREATED_FOLDER")
@Model()
export class UserCreatedFolder extends EventBase<UserCreatedFolderProps> {}

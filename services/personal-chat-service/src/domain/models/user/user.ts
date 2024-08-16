import { Id, Prop, StateAggregateBase, StateAggregateBuilder } from "ddd-node";
import { FolderBuilder } from "../folder/folder";
import { FolderFilter } from "../folder/folder-filter/folder-filter";
import { FolderStatus } from "../folder/folder-status";
import { UserCreatedFolder } from "./events/user-created-folder";
import { UserStatus } from "./user-status";

export interface UserProps {
  status: UserStatus;
}

export type CreateFolderProps = {
  name: string;
  filter: FolderFilter;
};

// export interface CreateChatProps {
//   chatId: Id;
//   chatType: string;
// }

export class User extends StateAggregateBase<UserProps> {
  @Prop()
  declare status: UserStatus;

  isActive() {
    return this.status.isActive();
  }

  createFolder(folderProps: CreateFolderProps) {
    if (!this.isActive()) throw new Error();

    const { name, filter } = folderProps;

    const folder = FolderBuilder()
      .withProps({
        name,
        ownerUserId: this.id(),
        status: FolderStatus.Active,
        items: [],
        filter,
      })
      .build();

    const { includedIds, excludedIds, archived, muted, read, type } =
      folder.filter;

    this.recordEvent(UserCreatedFolder, {
      userId: this.id(),
      folderId: folder.id(),
      folderName: folder.name,
      folderFilter: {
        includedIds,
        excludedIds,
        archived,
        muted,
        read,
        type: type?.value,
      },
    });

    return folder;
  }

  // createChat(props: CreateChatProps) {
  //   const chat = ChatBuilder.new()
  //     .withProps({
  //       userId: this.id(),
  //       chatId: props.chatId,
  //       type: props.chatType,
  //       archived: false,
  //     })
  //     .build();

  //   return chat;
  // }
}

export const UserBuilder = () => new StateAggregateBuilder(User);

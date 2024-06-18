import { Id, Prop, StateAggregateBase } from "ddd-node";
import { FolderStatus } from "../folder/folder-status";
import { FolderItemPinned } from "./events/folder-item-pinned";
import { FolderItemUnpinned } from "./events/folder-item-unpinned";

export interface FolderItemProps {
  readonly folderId: Id;
  readonly chatId: Id;
  pinned: boolean;
  pinnedDate?: Date;
}

export class FolderItem extends StateAggregateBase<FolderItemProps> {
  @Prop()
  declare folderId: Id;

  @Prop()
  declare chatId: Id;

  @Prop()
  declare pinned: boolean;

  @Prop()
  declare pinnedDate?: Date;

  pin(folderStatus: FolderStatus) {
    if (folderStatus.isActive()) {
      if (this.pinned) return;

      this._props.pinned = true;
      this._props.pinnedDate = new Date();

      this.recordEvent(FolderItemPinned, {});
    }
  }

  unpin(folderStatus: FolderStatus) {
    if (folderStatus.isActive()) {
      if (!this.pinned) return;

      this._props.pinned = false;
      this._props.pinnedDate = undefined;

      this.recordEvent(FolderItemUnpinned, {});
    }
  }
}

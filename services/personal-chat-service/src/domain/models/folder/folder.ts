import {
  Id,
  Prop,
  SnowflakeIdService,
  StateAggregateBase,
  UseIdService,
} from "ddd-node";
import { FolderCreated } from "./events/folder-created";
import { FolderFilterUpdated } from "./events/folder-filter-updated";
import { FolderRenamed } from "./events/folder-renamed";
import { FolderFilter } from "./folder-filter";
import { PinnedItem } from "./pinned-item";

export interface FolderProps {
  readonly ownerUserId: Id;
  name: string;
  pinnedItems: PinnedItem[];
  filter: FolderFilter;
}

export type CreateFolderProps = {
  ownerUserId: Id;
  name: string;
  filter?: FolderFilter;
};

@UseIdService(new SnowflakeIdService())
export class Folder extends StateAggregateBase<FolderProps> {
  static create(props: CreateFolderProps) {
    const { ownerUserId, name, filter } = props;

    const newFolder = Folder.newAggregate({
      ownerUserId,
      name,
      filter: filter ?? new FolderFilter({}),
      pinnedItems: [],
    });

    newFolder.recordEvent(FolderCreated, { name, ownerUserId });

    return newFolder;
  }

  @Prop()
  declare ownerUserId: Id;

  @Prop()
  declare name: string;

  @Prop()
  declare filter: FolderFilter;

  @Prop()
  declare pinnedItems: PinnedItem[];

  getPinnedItem(chatId: Id) {
    return this._props.pinnedItems.find((item) => item.chatId.equals(chatId));
  }

  rename(name: string) {
    this._props.name = name;

    this.recordEvent(FolderRenamed, { name });
  }

  updateFilter(filter: FolderFilter) {
    this._props.filter = filter;

    this.recordEvent(FolderFilterUpdated, {});
  }

  pinChat(chatId: Id) {
    const newItem = new PinnedItem({
      folderId: this.id(),
      chatId,
      pinnedDate: new Date(),
    });

    this._props.pinnedItems = this._props.pinnedItems
      .filter((item) => !item.chatId.equals(chatId))
      .concat(newItem);
  }

  unpinChat(chatId: Id) {
    const isPinned = Boolean(this.getPinnedItem(chatId));

    if (!isPinned) throw new Error();

    this._props.pinnedItems = this._props.pinnedItems.filter(
      (item) => !item.chatId.equals(chatId)
    );
  }
}

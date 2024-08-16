import {
  EntityBuilder,
  Id,
  Prop,
  StateAggregateBase,
  StateAggregateBuilder,
} from "ddd-node";
import { ChatDescriptor } from "../personal-chat/chat-descriptor";
import { FolderDeleted } from "./events/folder-deleted";
import { FolderFilterUpdated } from "./events/folder-filter-updated";
import { FolderRenamed } from "./events/folder-renamed";
import { FolderFilter } from "./folder-filter/folder-filter";
import { FolderStatus } from "./folder-status";
import { Item } from "./item";

export interface FolderProps {
  readonly ownerUserId: Id;
  name: string;
  filter: FolderFilter;
  items: Item[];
  status: FolderStatus;
}

export class Folder extends StateAggregateBase<FolderProps> {
  @Prop()
  declare ownerUserId: Id;

  @Prop()
  declare name: string;

  @Prop()
  declare filter: FolderFilter;

  @Prop()
  declare status: FolderStatus;

  @Prop()
  declare items: Item[];

  rename(name: string) {
    this._props.name = name;

    this.recordEvent(FolderRenamed, { name });
  }

  setFilter(filter: FolderFilter) {
    this._props.filter = filter;

    const { includedIds, excludedIds, archived, muted, read, type } =
      this.filter;

    this.recordEvent(FolderFilterUpdated, {
      includedIds,
      excludedIds,
      archived,
      muted,
      read,
      type,
    });
  }

  delete() {
    if (this.status.isDeleted()) return;

    this._props.status = FolderStatus.Deleted;

    this.recordEvent(FolderDeleted, {});
  }

  getItem(chatId: Id) {
    return this._props.items.find((item) => item.chatId === chatId);
  }

  addItem(chatId: Id) {
    const itemBuilder = new EntityBuilder(Item);

    const item = itemBuilder.withProps({ chatId, pinned: false }).build();

    this._props.items.push(item);
  }

  deleteItem(chatId: Id) {
    this._props.items = this._props.items.filter(
      (item) => item.chatId !== chatId
    );
  }

  private syncItem(chatDescriptor: ChatDescriptor) {
    const matches = this.filter.matchesFilter(chatDescriptor);
    const item = this.getItem(chatDescriptor.chatId);

    if (item && !matches) return this.deleteItem(chatDescriptor.chatId);

    if (!item && matches) return this.addItem(chatDescriptor.chatId);
  }

  sync(chatDescriptors: ChatDescriptor[]) {
    chatDescriptors.forEach((chatDescriptor) => this.syncItem(chatDescriptor));
  }

  pinChat(chatId: Id) {
    const item = this.getItem(chatId);

    if (!item) throw new Error();

    item.pin();
  }

  unpinChat(chatId: Id) {
    const item = this.getItem(chatId);

    if (!item) throw new Error();

    item.unpin();
  }
}

export const FolderBuilder = () => new StateAggregateBuilder(Folder);

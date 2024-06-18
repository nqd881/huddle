import {
  Id,
  Prop,
  SnowflakeIdService,
  StateAggregateBase,
  UseIdService,
} from "ddd-node";
import { ChatDescriptor } from "./chat-descriptor";
import { FolderCreated } from "./events/folder-created";
import { FolderDeleted } from "./events/folder-deleted";
import { FolderFiltersUpdated } from "./events/folder-filters-updated";
import { FolderRenamed } from "./events/folder-renamed";
import { FolderFilter } from "./folder-filter/folder-filter";
import { FolderStatus } from "./folder-status";
import { FolderEligibleChats } from "./folder-eligible-chats";

export interface FolderProps {
  readonly ownerUserId: Id;
  name: string;
  filters: FolderFilter[];
  status: FolderStatus;
}

export type CreateFolderProps = {
  ownerUserId: Id;
  name: string;
  filters?: FolderFilter[];
};

@UseIdService(new SnowflakeIdService())
export class Folder extends StateAggregateBase<FolderProps> {
  static create(props: CreateFolderProps) {
    const { ownerUserId, name, filters } = props;

    const newFolder = Folder.newAggregate({
      ownerUserId,
      name,
      filters: filters ?? [],
      status: FolderStatus.Active,
    });

    newFolder.recordEvent(FolderCreated, { name, ownerUserId });

    return newFolder;
  }

  @Prop()
  declare ownerUserId: Id;

  @Prop()
  declare name: string;

  @Prop()
  declare filters: FolderFilter[];

  @Prop()
  declare status: FolderStatus;

  rename(name: string) {
    this._props.name = name;

    this.recordEvent(FolderRenamed, { name });
  }

  setFilters(filters: FolderFilter[]) {
    this._props.filters = filters;

    this.recordEvent(FolderFiltersUpdated, {});
  }

  delete() {
    if (this.status.isDeleted()) return;

    this._props.status = FolderStatus.Deleted;

    this.recordEvent(FolderDeleted, {});
  }

  filter(chatDescriptors: ChatDescriptor[]): FolderEligibleChats {
    const matches = chatDescriptors.filter((chatDescriptor) =>
      this._props.filters.some((filter) => filter.matchesFilter(chatDescriptor))
    );

    return new FolderEligibleChats({
      folderId: this.id(),
      chatIds: matches.map((descriptor) => descriptor.chatId),
    });
  }
}

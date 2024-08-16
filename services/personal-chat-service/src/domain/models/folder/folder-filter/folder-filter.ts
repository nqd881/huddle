import { Id, Prop, ValueObjectBase } from "ddd-node";
import _ from "lodash";
import { ChatDescriptor } from "../../personal-chat/chat-descriptor";
import { ChatType } from "../../personal-chat/chat-type";
import { ChatArchivedFilter } from "./chat-archived-filter";
import { ChatIdFilter } from "./chat-id-filter";
import { ChatMutedFilter } from "./chat-muted-filter";
import { ChatReadFilter } from "./chat-read-filter";
import { ChatTypeFilter } from "./chat-type-filter";
import { FolderFilterBase } from "./folder-filter.base";

export class FolderFilterProps {
  includedIds?: Id[];
  excludedIds?: Id[];
  archived?: boolean;
  muted?: boolean;
  read?: boolean;
  type?: ChatType;
}

export class FolderFilter extends FolderFilterBase<FolderFilterProps> {
  @Prop()
  declare includedIds?: Id[];

  @Prop()
  declare excludedIds?: Id[];

  @Prop()
  declare archived?: boolean;

  @Prop()
  declare muted?: boolean;

  @Prop()
  declare read?: boolean;

  @Prop()
  declare type?: ChatType;

  private filters() {
    const filters: FolderFilterBase[] = [];

    if (!_.isNil(this.includedIds) || !_.isNil(this.excludedIds))
      filters.push(
        new ChatIdFilter({
          includedIds: this.includedIds ?? [],
          excludedIds: this.excludedIds ?? [],
        })
      );

    if (!_.isNil(this.archived))
      filters.push(new ChatArchivedFilter({ archived: this.archived }));

    if (!_.isNil(this.muted))
      filters.push(new ChatMutedFilter({ muted: this.muted }));

    if (!_.isNil(this.read))
      filters.push(new ChatReadFilter({ read: this.read }));

    if (!_.isNil(this.type))
      filters.push(new ChatTypeFilter({ type: this.type }));

    return filters;
  }

  matchesFilter(chatDescriptor: ChatDescriptor): boolean {
    return this.filters().some((filter) =>
      filter.matchesFilter(chatDescriptor)
    );
  }
}

export const FolderFilterBuilder = () => new ValueObjectBase(FolderFilter);

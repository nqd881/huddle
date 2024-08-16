import { isNil } from "lodash";
import { ChatArchivedFilter } from "../../../../domain/models/folder/folder-filter/chat-archived-filter";
import { ChatIdFilter } from "../../../../domain/models/folder/folder-filter/chat-id-filter";
import { ChatMutedFilter } from "../../../../domain/models/folder/folder-filter/chat-muted-filter";
import { ChatReadFilter } from "../../../../domain/models/folder/folder-filter/chat-read-filter";
import { ChatTypeFilter } from "../../../../domain/models/folder/folder-filter/chat-type-filter";
import { FolderFilterBase } from "../../../../domain/models/folder/folder-filter/folder-filter.base";
import { ChatTypeBuilder } from "../../../../domain/models/personal-chat/chat-type";

export interface FiltersOptions {
  includedIds?: string[];
  excludedIds?: string[];
  type?: string;
  muted?: boolean;
  read?: boolean;
  archived?: boolean;
}

export const parseFilters = (
  filtersOptions: FiltersOptions
): FolderFilterBase[] => {
  const { includedIds, type, excludedIds, muted, read, archived } =
    filtersOptions;

  const filters: FolderFilterBase[] = [];

  if (!isNil(includedIds) || isNil(excludedIds))
    filters.push(
      new ChatIdFilter({
        includedIds: includedIds || [],
        excludedIds: excludedIds || [],
      })
    );

  if (!isNil(type))
    filters.push(
      new ChatTypeFilter({ type: ChatTypeBuilder().withValue(type).build() })
    );

  if (!isNil(muted)) filters.push(new ChatMutedFilter({ muted }));

  if (!isNil(read)) filters.push(new ChatReadFilter({ read }));

  if (!isNil(archived)) filters.push(new ChatArchivedFilter({ archived }));

  return filters;
};

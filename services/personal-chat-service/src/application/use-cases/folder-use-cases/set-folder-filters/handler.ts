import { Id } from "ddd-node";
import { isNil } from "lodash";
import { SetFolderFiltersCommand } from ".";
import { IDomainRegistry } from "../../../../domain/domain";
import { ChatArchivedFilter } from "../../../../domain/models/folder/folder-filter/chat-archived-filter";
import { ChatIdFilter } from "../../../../domain/models/folder/folder-filter/chat-id-filter";
import { ChatMutedFilter } from "../../../../domain/models/folder/folder-filter/chat-muted-filter";
import { ChatReadFilter } from "../../../../domain/models/folder/folder-filter/chat-read-filter";
import { ChatTypeFilter } from "../../../../domain/models/folder/folder-filter/chat-type-filter";
import { FolderFilter } from "../../../../domain/models/folder/folder-filter/folder-filter";
import { ChatType } from "../../../../domain/models/personal-chat/chat-type";
import { IAppCommandHandler } from "../../../base/app-command";
import { toIds } from "../../../utils/id";
import { Type } from "../../../utils/type";
import { FolderError } from "../folder-error";

export class SetFolderFiltersHandler
  implements IAppCommandHandler<SetFolderFiltersCommand>
{
  constructor(private readonly domainRegistry: IDomainRegistry) {}

  commandType(): Type<SetFolderFiltersCommand> {
    return SetFolderFiltersCommand;
  }

  async handleCommand(command: SetFolderFiltersCommand) {
    const { payload } = command;

    const { includedIds, type, excludedIds, muted, read, archived } = payload;

    const folderId = new Id(payload.folderId);

    const folder = await this.domainRegistry.folderRepo().findById(folderId);

    if (!folder) throw new FolderError.FolderNotFound(folderId);

    const filters: FolderFilter[] = [];

    if (!isNil(includedIds) || isNil(excludedIds))
      filters.push(
        new ChatIdFilter({
          includedIds: toIds(includedIds || []),
          excludedIds: toIds(excludedIds || []),
        })
      );

    if (!isNil(type))
      filters.push(new ChatTypeFilter({ type: ChatType.parse(type) }));

    if (!isNil(muted)) filters.push(new ChatMutedFilter({ muted }));

    if (!isNil(read)) filters.push(new ChatReadFilter({ read }));

    if (!isNil(archived)) filters.push(new ChatArchivedFilter({ archived }));

    folder.setFilters(filters);

    return this.domainRegistry.folderRepo().save(folder);
  }
}

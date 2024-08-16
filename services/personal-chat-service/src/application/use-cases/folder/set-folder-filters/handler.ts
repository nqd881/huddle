import { inject, injectable } from "inversify";
import { SetFolderFiltersCommand } from ".";
import { FolderFilter } from "../../../../domain/models/folder/folder-filter/folder-filter";
import { ChatTypeBuilder } from "../../../../domain/models/personal-chat/chat-type";
import { RepoRegistryToken } from "../../../app.token";
import { IAppCommandHandler } from "../../../base/app-command";
import { IRepoRegistry } from "../../../output-ports/repo-registry";
import { Type } from "../../../utils/type";
import { FolderError } from "../folder-error";

@injectable()
export class SetFolderFiltersHandler
  implements IAppCommandHandler<SetFolderFiltersCommand>
{
  constructor(
    @inject(RepoRegistryToken)
    private readonly repoRegistry: IRepoRegistry
  ) {}

  commandType(): Type<SetFolderFiltersCommand> {
    return SetFolderFiltersCommand;
  }

  async handleCommand(command: SetFolderFiltersCommand) {
    const { payload } = command;

    const { folderId, includedIds, type, excludedIds, muted, read, archived } =
      payload;

    const folder = await this.repoRegistry.folderRepo().findById(folderId);

    if (!folder) throw new FolderError.FolderNotFound(folderId);

    folder.setFilter(
      new FolderFilter({
        includedIds,
        excludedIds,
        archived,
        muted,
        read,
        type: type ? ChatTypeBuilder().withValue(type).build() : undefined,
      })
    );

    return this.repoRegistry.folderRepo().save(folder);
  }
}

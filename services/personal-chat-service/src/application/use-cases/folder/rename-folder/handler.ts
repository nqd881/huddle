import { inject, injectable } from "inversify";
import { RepoRegistryToken } from "../../../app.token";
import { IAppCommandHandler } from "../../../base/app-command";
import { IRepoRegistry } from "../../../output-ports/repo-registry";
import { FolderError } from "../folder-error";
import { RenameFolderCommand } from "./command";

@injectable()
export class RenameFolderHandler
  implements IAppCommandHandler<RenameFolderCommand>
{
  constructor(
    @inject(RepoRegistryToken)
    private readonly repoRegistry: IRepoRegistry
  ) {}

  commandType() {
    return RenameFolderCommand;
  }

  async handleCommand(command: RenameFolderCommand) {
    const { folderId, name } = command.payload;

    const folder = await this.repoRegistry.folderRepo().findById(folderId);

    if (!folder) throw new FolderError.FolderNotFound(folderId);

    folder.rename(name);

    return this.repoRegistry.folderRepo().save(folder);
  }
}

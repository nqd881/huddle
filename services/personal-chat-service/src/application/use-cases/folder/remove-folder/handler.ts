import { inject, injectable } from "inversify";
import { RepoRegistryToken } from "../../../app.token";
import { IAppCommandHandler } from "../../../base/app-command";
import { IRepoRegistry } from "../../../output-ports/repo-registry";
import { Type } from "../../../utils/type";
import { RemoveFolderCommand } from "./command";

@injectable()
export class RemoveFolderHandler
  implements IAppCommandHandler<RemoveFolderCommand>
{
  constructor(
    @inject(RepoRegistryToken)
    private readonly repoRegistry: IRepoRegistry
  ) {}

  commandType(): Type<RemoveFolderCommand> {
    return RemoveFolderCommand;
  }

  async handleCommand(command: RemoveFolderCommand): Promise<void> {
    const { folderId } = command.payload;

    return this.repoRegistry.folderRepo().delete(folderId);
  }
}

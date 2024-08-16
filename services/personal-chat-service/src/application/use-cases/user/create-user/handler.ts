import { inject, injectable } from "inversify";
import { IAppCommandHandler } from "../../../base";
import { CreateUserCommand } from ".";
import { Type } from "../../../utils/type";
import { RepoRegistryToken } from "../../../app.token";
import { IRepoRegistry } from "../../../output-ports/repo-registry";
import { UserService } from "../../../../domain/services/user.service";

@injectable()
export class CreateUserHandler
  implements IAppCommandHandler<CreateUserCommand>
{
  constructor(@inject(RepoRegistryToken) private repoRegistry: IRepoRegistry) {}

  commandType(): Type<CreateUserCommand> {
    return CreateUserCommand;
  }

  async handleCommand(command: CreateUserCommand): Promise<void> {
    const { userId } = command.payload;

    const user = UserService.createUser(userId);

    await this.repoRegistry.userRepo().save(user);
  }
}

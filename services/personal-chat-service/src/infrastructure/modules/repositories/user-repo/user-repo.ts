import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { Id } from "ddd-node";
import { User } from "../../../../domain/models/user/user";
import { IUserRepo } from "../../../../domain/repositories/user.repo";
import { RepoBaseService } from "../../repo-base/repo-base.service";
import { UserModel } from "./models/user.model";
import { UserMapper } from "./user.mapper";

@Injectable()
export class UserRepo implements IUserRepo {
  constructor(
    @InjectModel(UserModel) private userModel: typeof UserModel,
    private userMapper: UserMapper,
    private repoBaseService: RepoBaseService
  ) {}

  findById(id: Id): Promise<User | null> {
    const findFn = () => this.userModel.findByPk(id);

    return this.repoBaseService.findOne(findFn, this.userMapper);
  }

  save(instance: User): Promise<any> {
    return this.repoBaseService.save(instance, this.userMapper);
  }

  userOfId(userId: Id): Promise<User | null> {
    const findFn = () => this.userModel.findByPk(userId);

    return this.repoBaseService.findOne(findFn, this.userMapper);
  }
}

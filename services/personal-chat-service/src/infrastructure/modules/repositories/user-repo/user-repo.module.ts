import { Module } from "@nestjs/common";
import { SequelizeModule } from "@nestjs/sequelize";
import { UserModel } from "./models/user.model";
import { UserMapper } from "./user.mapper";
import { UserRepo } from "./user-repo";
import { USER_REPO } from "./token";
import { RepoBaseModule } from "../../repo-base/repo-base.module";

@Module({
  imports: [SequelizeModule.forFeature([UserModel]), RepoBaseModule],
  providers: [UserMapper, { provide: USER_REPO, useClass: UserRepo }],
  exports: [USER_REPO],
})
export class UserRepoModule {}

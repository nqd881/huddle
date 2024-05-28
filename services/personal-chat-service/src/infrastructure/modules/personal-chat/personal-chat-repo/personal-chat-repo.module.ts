import { Module } from "@nestjs/common";
import { RepoBaseModule } from "../../repo-base/repo-base.module";
import { PersonalChatRepo } from "./personal-chat-repo";
import { PersonalChatMapper } from "./personal-chat-mapper";
import { PersonalChatModel } from "./personal-chat-model";
import { SequelizeModule } from "@nestjs/sequelize";

@Module({
  imports: [RepoBaseModule, SequelizeModule.forFeature([PersonalChatModel])],
  providers: [PersonalChatMapper, PersonalChatRepo],
  exports: [PersonalChatRepo],
})
export class PersonalChatRepoModule {}

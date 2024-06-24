import { Module } from "@nestjs/common";
import { RepoBaseModule } from "../../repo-base/repo-base.module";
import { PersonalChatRepo } from "./personal-chat-repo";
import { PersonalChatMapper } from "./personal-chat.mapper";
import { PersonalChatModel } from "./personal-chat.model";
import { SequelizeModule } from "@nestjs/sequelize";
import { PERSONAL_CHAT_REPO } from "./token";

@Module({
  imports: [RepoBaseModule, SequelizeModule.forFeature([PersonalChatModel])],
  providers: [
    PersonalChatMapper,
    { provide: PERSONAL_CHAT_REPO, useClass: PersonalChatRepo },
  ],
  exports: [PERSONAL_CHAT_REPO],
})
export class PersonalChatRepoModule {}

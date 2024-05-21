import { InjectModel } from "@nestjs/sequelize";
import { Id } from "ddd-node";
import { PersonalChat } from "../../../../domain/models/personal-chat/personal-chat";
import { IPersonalChatRepo } from "../../../../domain/repositories/personal-chat.repo";
import { RepoBaseService } from "../repo-base/repo-base.service";
import { PersonalChatMapper } from "./personal-chat-mapper";
import { PersonalChatModel } from "./personal-chat-model";
import { Injectable } from "@nestjs/common";

@Injectable()
export class PersonalChatRepo implements IPersonalChatRepo {
  constructor(
    @InjectModel(PersonalChatModel) private model: typeof PersonalChatModel,
    private mapper: PersonalChatMapper,
    private repoBaseService: RepoBaseService
  ) {}

  findById(id: Id): Promise<PersonalChat | null> {
    const findingFn = () => this.model.findByPk(id.value);

    return this.repoBaseService.findOne(findingFn, this.mapper);
  }

  save(instance: PersonalChat): Promise<any> {
    return this.repoBaseService.save(instance, this.mapper);
  }
}

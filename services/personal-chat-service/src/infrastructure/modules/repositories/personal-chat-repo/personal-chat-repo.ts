import { InjectModel } from "@nestjs/sequelize";
import { Id } from "ddd-node";
import { PersonalChat } from "../../../../domain/models/personal-chat/personal-chat";
import { IPersonalChatRepo } from "../../../../domain/repositories/personal-chat.repo";
import { RepoBaseService } from "../../repo-base/repo-base.service";
import { PersonalChatMapper } from "./personal-chat.mapper";
import { PersonalChatModel } from "./personal-chat.model";
import { Injectable } from "@nestjs/common";
import { ChatDescriptor } from "../../../../domain/models/personal-chat/chat-descriptor";
import { Sequelize } from "sequelize-typescript";

@Injectable()
export class PersonalChatRepo implements IPersonalChatRepo {
  constructor(
    @InjectModel(PersonalChatModel) private model: typeof PersonalChatModel,
    private mapper: PersonalChatMapper,
    private repoBaseService: RepoBaseService,
    private sequelize: Sequelize
  ) {}

  findById(id: Id): Promise<PersonalChat | null> {
    const findingFn = () => this.model.findByPk(id);

    return this.repoBaseService.findOne(findingFn, this.mapper);
  }

  save(instance: PersonalChat): Promise<any> {
    return this.repoBaseService.save(instance, this.mapper);
  }

  async allChatDescriptorsOfUser(userId: Id): Promise<ChatDescriptor[]> {
    // const [result, metadata] = await this.sequelize.query(
    //   `SELECT * FROM personal_chats WHERE "ownerUserId" = '${userId}'`
    // );

    // console.log(result, metadata);

    const findingFn = () =>
      this.model.findAll({
        where: {
          ownerUserId: userId,
        },
      });

    const chats = await this.repoBaseService.findMany(findingFn, this.mapper);

    return chats.map(
      (chat) =>
        new ChatDescriptor({
          chatId: chat.id(),
          type: chat.type,
          isMuted: chat.isMuted(),
          isArchived: chat.archived,
          isRead: false,
        })
    );
  }
}

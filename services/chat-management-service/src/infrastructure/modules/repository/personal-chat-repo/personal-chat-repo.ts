import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { Id } from "ddd-node";
import { ClsService } from "nestjs-cls";
import { Transaction } from "sequelize";
import { Sequelize } from "sequelize-typescript";
import { PersonalChat } from "../../../../domain/models/personal-chat/personal-chat";
import { IPersonalChatRepo } from "../../../../domain/repositories/personal-chat.repo";
import { RepoService } from "../repo-base/repo.service";
import { PersonalChatMapper } from "./personal-chat-mapper";
import { PersonalChatModel } from "./personal-chat-model";

@Injectable()
export class PersonalChatRepo implements IPersonalChatRepo {
  constructor(
    @InjectModel(PersonalChatModel)
    private model: typeof PersonalChatModel,
    private mapper: PersonalChatMapper,
    private repoService: RepoService,
    private clsService: ClsService,
    private sequelize: Sequelize
  ) {}

  async findAll(): Promise<PersonalChat[]> {
    const result = await this.model.findAll();

    console.log("Find all result", result);

    return [];
  }

  async save(instance: PersonalChat): Promise<any> {
    console.log("Start saving personal chat instance...");

    const save = async () => {
      await this.repoService
        .eventPublisher()
        .publishAll(instance.getEvents() as any[]);

      const persistenceModel = this.mapper.toPersistence(instance);

      await persistenceModel.save();
    };

    let transaction = this.clsService.get("TRANSACTION") as Transaction | null;

    if (!transaction) {
      transaction = await this.sequelize.transaction();

      this.clsService.set("TRANSACTION", transaction);

      try {
        await save();

        await transaction.commit();
      } catch (err) {
        console.log(err);

        await transaction.rollback();
      }
    } else {
      await save();
    }

    console.log("End saving personal chat instance...");
  }

  async findById(id: Id): Promise<PersonalChat | null> {
    const result = await this.model.findOne({
      where: { id: id.value },
    });

    if (!result) return null;

    return this.mapper.toDomain(result);
  }
}

export class AggregateProxy {
  constructor() {}
}

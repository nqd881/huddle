import { Injectable } from "@nestjs/common";
import { IItemRepo } from "../../../../domain/repositories/folder-item.repo";
import { InjectModel } from "@nestjs/sequelize";
import { ItemModel } from "./item-model";
import { ItemMapper } from "./item-mapper";
import { RepoService } from "../repo-base/repo.service";
import { Id } from "ddd-node";
import { Item } from "../../../../domain/models/item/item";

@Injectable()
export class ItemRepo implements IItemRepo {
  constructor(
    @InjectModel(ItemModel) private model: typeof ItemModel,
    private mapper: ItemMapper,
    private repoService: RepoService
  ) {}

  async findById(id: Id): Promise<Item | null> {
    const result = await this.model.scope("full").findByPk(id.value);

    if (!result) return null;

    return this.mapper.toDomain(result);
  }

  async save(instance: Item): Promise<any> {
    console.log("Start saving item instance....");

    return this.repoService
      .transaction(async (transaction) => {
        await this.repoService
          .eventPublisher()
          .publishAll(instance.getEvents());

        const persistenceModel = this.mapper.toPersistence(instance);

        if (persistenceModel) await persistenceModel.save({ transaction });
      })
      .finally(() => {
        console.log("End saving folder instance...");
      });
  }
}

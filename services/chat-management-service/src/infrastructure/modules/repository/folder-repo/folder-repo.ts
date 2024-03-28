import { Id } from "ddd-node";
import { Folder } from "../../../../domain/models/folder/folder";
import { IFolderRepo } from "../../../../domain/repositories/folder.repo";
import { InjectModel } from "@nestjs/sequelize";
import { FolderModel, SelectionModel } from "./folder-model";
import { RepoService } from "../repo-base/repo.service";
import { FolderMapper } from "./folder-mapper";
import { ClsService } from "nestjs-cls";
import { Transaction } from "sequelize";
import { Sequelize } from "sequelize-typescript";

export class FolderRepo implements IFolderRepo {
  constructor(
    @InjectModel(FolderModel) private model: typeof FolderModel,
    private mapper: FolderMapper,
    private repoService: RepoService
  ) {}

  async findById(id: Id): Promise<Folder | null> {
    const result = await this.model.scope("full").findByPk(id.value);

    console.log("Result", result);

    console.log("Name", result?.name);
    console.log("Include selection", result?.includeSelection);
    console.log("Exclude selection", result?.excludeSelection);

    if (!result) return null;

    return this.mapper.toDomain(result);
  }

  async save(instance: Folder): Promise<any> {
    console.log("Start saving folder instance....");

    return this.repoService
      .transaction(async (transaction) => {
        await this.repoService
          .eventPublisher()
          .publishAll(instance.getEvents());

        const persistenceModel = this.mapper.toPersistence(instance);

        await persistenceModel.save({ transaction });
      })
      .finally(() => {
        console.log("End saving folder instance...");
      });
  }
}

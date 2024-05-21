import { InjectModel } from "@nestjs/sequelize";
import { Id } from "ddd-node";
import { Folder } from "../../../../domain/models/folder/folder";
import { IFolderRepo } from "../../../../domain/repositories/folder.repo";
import { RepoBaseService } from "../repo-base/repo-base.service";
import { FolderMapper } from "./folder-mapper";
import { FolderModel } from "./folder-model";
import { Injectable } from "@nestjs/common";

@Injectable()
export class FolderRepo implements IFolderRepo {
  constructor(
    @InjectModel(FolderModel) private model: typeof FolderModel,
    private mapper: FolderMapper,
    private repoBaseService: RepoBaseService
  ) {}

  findById(id: Id): Promise<Folder | null> {
    const findingFn = () => this.model.scope("full").findByPk(id.value);

    return this.repoBaseService.findOne(findingFn, this.mapper);
  }

  save(instance: Folder): Promise<any> {
    return this.repoBaseService.save(instance, this.mapper);
  }
}

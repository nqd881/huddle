import { InjectModel } from "@nestjs/sequelize";
import { Id } from "ddd-node";
import { Folder } from "../../../../domain/models/folder/folder";
import { IFolderRepo } from "../../../../domain/repositories/folder.repo";
import { RepoBaseService } from "../../repo-base/repo-base.service";
import { FolderMapper } from "./folder-mapper";
import { Injectable } from "@nestjs/common";
import { FolderModel } from "./folder-model";

@Injectable()
export class FolderRepo implements IFolderRepo {
  constructor(
    @InjectModel(FolderModel) private folderModel: typeof FolderModel,
    private folderMapper: FolderMapper,
    private repoBaseService: RepoBaseService
  ) {}

  findAll() {
    const findingFn = () => this.folderModel.findAll();

    return this.repoBaseService.findMany(findingFn, this.folderMapper);
  }

  findById(id: Id) {
    const findingFn = () => this.folderModel.scope("full").findByPk(id.value);

    return this.repoBaseService.findOne(findingFn, this.folderMapper);
  }

  save(instance: Folder): Promise<any> {
    return this.repoBaseService.save(instance, this.folderMapper);
  }
}

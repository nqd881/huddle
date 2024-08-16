import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { Id } from "ddd-node";
import { Sequelize } from "sequelize-typescript";
import { Folder } from "../../../../domain/models/folder/folder";
import { IFolderRepo } from "../../../../domain/repositories/folder.repo";
import { RepoBaseService } from "../../repo-base/repo-base.service";
import { FolderMapper } from "./folder.mapper";
import { FolderModel } from "./models/folder.model";

@Injectable()
export class FolderRepo implements IFolderRepo {
  constructor(
    @InjectModel(FolderModel) private folderModel: typeof FolderModel,
    private folderMapper: FolderMapper,
    private repoBaseService: RepoBaseService,
    private sequelize: Sequelize
  ) {}

  findAll() {
    const findingFn = () =>
      this.folderModel.scope(["withFilter", "withItems"]).findAll();

    return this.repoBaseService.findMany(findingFn, this.folderMapper);
  }

  findById(id: Id) {
    const findingFn = () =>
      this.folderModel.scope(["withFilter", "withItems"]).findByPk(id);

    return this.repoBaseService.findOne(findingFn, this.folderMapper);
  }

  folderOfId(id: Id) {
    const findingFn = () =>
      this.folderModel.scope(["withFilter", "withItems"]).findByPk(id);

    return this.repoBaseService.findOne(findingFn, this.folderMapper);
  }

  async save(instance: Folder): Promise<any> {
    return this.repoBaseService.save(instance, this.folderMapper);
  }

  // async getFolderStatus(folderId: Id): Promise<FolderStatus | null> {
  //   const status = await this.sequelize.query(
  //     `SELECT status FROM folders WHERE id = ${folderId.value}`,
  //     { raw: true }
  //   );

  //   console.log(status);

  //   return null;
  // }

  // async getIdFilter(folderId: Id): Promise<ChatIdFilter | null> {
  //   const filter = await this.sequelize.query(
  //     `SELECT * from chat_id_filters WHERE folderId = ${folderId.value}`,
  //     { raw: true }
  //   );

  //   console.log("IdFilter raw", filter);

  //   return null;
  // }

  // async getMutedFilter(folderId: Id): Promise<ChatMutedFilter | null> {
  //   const filter = await this.sequelize.query(
  //     `SELECT * from chat_muted_filters WHERE folderId = ${folderId.value}`,
  //     { raw: true }
  //   );

  //   console.log("Muted filter", filter);

  //   return null;
  // }

  async delete(id: Id) {
    await this.folderModel.destroy({ where: { id: id } });
  }

  async allFoldersOfUser(userId: Id): Promise<Folder[]> {
    const findingFn = () =>
      this.folderModel.scope(["withFilter", "withItems"]).findAll({
        where: {
          ownerUserId: userId,
        },
      });

    return this.repoBaseService.findMany(findingFn, this.folderMapper);
  }
}

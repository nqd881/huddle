import { Injectable } from "@nestjs/common";
import { IFolderItemRepo } from "../../../../domain/repositories/folder-item.repo";
import { FolderItemModel } from "./folder-item.model";
import { InjectModel } from "@nestjs/sequelize";
import { RepoBaseService } from "../../repo-base/repo-base.service";
import { FolderItemMapper } from "./folder-item.mapper";
import { FolderItem } from "../../../../domain/models/folder-item/folder-item";
import { Id } from "ddd-node";

@Injectable()
export class FolderItemRepo implements IFolderItemRepo {
  constructor(
    @InjectModel(FolderItemModel)
    private folderItemModel: typeof FolderItemModel,
    private folderItemMapper: FolderItemMapper,
    private repoBaseService: RepoBaseService
  ) {}

  findById(id: Id): Promise<FolderItem | null> {
    const findingFn = () => this.folderItemModel.findByPk(id.value);

    return this.repoBaseService.findOne(findingFn, this.folderItemMapper);
  }

  save(instance: FolderItem): Promise<any> {
    return this.repoBaseService.save(instance, this.folderItemMapper);
  }

  findInFolder(folderId: Id, chatId: Id): Promise<FolderItem | null> {
    const findingFn = () =>
      this.folderItemModel.findOne({
        where: { folderId: folderId.value, chatId: chatId.value },
      });

    return this.repoBaseService.findOne(findingFn, this.folderItemMapper);
  }
}

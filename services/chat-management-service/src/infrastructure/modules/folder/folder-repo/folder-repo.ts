import { Id } from "ddd-node";
import { Folder } from "../../../../domain/models/folder/folder";
import { IFolderRepo } from "../../../../domain/repositories/folder.repo";
import { Injectable } from "@nestjs/common";

export let FolderCache: Folder[] = [];

@Injectable()
export class FolderRepo implements IFolderRepo {
  async save(folder: Folder) {
    FolderCache = FolderCache.filter(
      (cachedFolder) => !cachedFolder.hasId(folder.getId())
    );

    FolderCache.push(folder);
  }

  async findById(id: Id): Promise<Folder | null> {
    return (
      FolderCache.find((folder) => {
        return folder.hasId(id);
      }) || null
    );
  }
}

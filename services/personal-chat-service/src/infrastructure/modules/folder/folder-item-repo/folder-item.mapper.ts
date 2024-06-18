import { Injectable } from "@nestjs/common";
import { FolderItem } from "../../../../domain/models/folder-item/folder-item";
import { IMapper } from "../../../interface/mapper";
import { FolderItemModel } from "./folder-item.model";
import { Id } from "ddd-node";

@Injectable()
export class FolderItemMapper implements IMapper<FolderItem, FolderItemModel> {
  toDomain(model: FolderItemModel): FolderItem {
    const { id, folderId, chatId, pinned, pinnedDate } = model;

    return FolderItem.newAggregate(
      {
        folderId: new Id(folderId),
        chatId: new Id(chatId),
        pinned,
        pinnedDate: pinnedDate ? new Date(pinnedDate) : undefined,
      },
      new Id(id)
    );
  }

  toPersistence(model: FolderItem) {
    const { folderId, chatId, pinned, pinnedDate } = model;

    return FolderItemModel.build({
      id: model.id().value,
      folderId: folderId.value,
      chatId: chatId.value,
      pinned,
      pinnedDate: pinnedDate ? pinnedDate.getTime() : undefined,
    });
  }
}

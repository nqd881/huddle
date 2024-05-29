import { Injectable } from "@nestjs/common";
import { Folder } from "../../../../domain/models/folder/folder";
import { FolderFilter } from "../../../../domain/models/folder/folder-filter";
import { PinnedItem } from "../../../../domain/models/folder/pinned-item";
import { PersonalChat } from "../../../../domain/models/personal-chat/personal-chat";
import { IMapper } from "../../../interface/mapper";
import { FolderModel, PinnedItemModel } from "./folder-model";
import { Id } from "ddd-node";

@Injectable()
export class FolderMapper implements IMapper<Folder, FolderModel> {
  toDomain(persistenceModel: FolderModel): Folder {
    const { id, name, ownerUserId, pinnedItems } = persistenceModel;

    return Folder.newAggregate(
      {
        name,
        ownerUserId: new Id(ownerUserId),
        pinnedItems: (pinnedItems || []).map(
          ({ folderId, chatId, pinnedDate }) =>
            new PinnedItem({
              folderId: Folder.id(folderId),
              chatId: PersonalChat.id(chatId),
              pinnedDate: new Date(pinnedDate),
            })
        ),
        filter: new FolderFilter({}),
      },
      Folder.id(id)
    );
  }

  toPersistence(domainModel: Folder): FolderModel {
    const { ownerUserId, name, pinnedItems } = domainModel.props();

    const id = domainModel.id();

    return FolderModel.build(
      {
        id: id.value,
        ownerUserId: ownerUserId.value,
        name: name,
        pinnedItems: pinnedItems.map(({ folderId, chatId, pinnedDate }) => ({
          folderId: folderId.value,
          chatId: chatId.value,
          pinnedDate: pinnedDate.getTime(),
        })),
      },
      {
        include: [
          {
            model: PinnedItemModel,
            as: "pinnedItems",
          },
        ],
      }
    );
  }
}

import { Injectable } from "@nestjs/common";
import { Id } from "ddd-node";
import { Folder } from "../../../../domain/models/folder/folder";
import { IMapper } from "../_interfaces/mapper";
import { FolderModel, PinnedItemModel } from "./folder-model";
import { FolderFilter } from "../../../../domain/models/folder/folder-filter";
import { PinnedItem } from "../../../../domain/models/folder/pinned-item";
import { PersonalChat } from "../../../../domain/models/personal-chat/personal-chat";

@Injectable()
export class FolderMapper implements IMapper<Folder, FolderModel> {
  toDomain(persistenceModel: FolderModel): Folder {
    const { id, name, ownerUserId, pinnedItems } = persistenceModel;

    return Folder.newAggregate(
      {
        name,
        ownerUserId: Folder.id(ownerUserId),
        pinnedItems: pinnedItems.map(
          ({ folderId, chatId, pinnedDate }) =>
            new PinnedItem({
              folderId: Folder.id(folderId),
              chatId: PersonalChat.id(chatId),
              pinnedDate,
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
          pinnedDate,
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

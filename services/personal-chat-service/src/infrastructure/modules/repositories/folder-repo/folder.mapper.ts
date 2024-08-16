import { Injectable } from "@nestjs/common";
import { EntityBuilder, StateAggregateBuilder } from "ddd-node";
import { Folder } from "../../../../domain/models/folder/folder";
import { FolderFilter } from "../../../../domain/models/folder/folder-filter/folder-filter";
import { FolderStatusBuilder } from "../../../../domain/models/folder/folder-status";
import { Item } from "../../../../domain/models/folder/item";
import { ChatTypeBuilder } from "../../../../domain/models/personal-chat/chat-type";
import { IMapper } from "../../../interface/mapper";
import {
  FolderFilterModel,
  FolderModel,
  FolderModelCreationAttributes,
} from "./models";
import { ItemModel } from "./models/item.model";

@Injectable()
export class FolderFilterMapper
  implements IMapper<FolderFilter, FolderFilterModel>
{
  toDomain(model: FolderFilterModel): FolderFilter {
    const { includedIds, excludedIds, archived, muted, read, type } = model;

    return new FolderFilter({
      includedIds: includedIds ?? undefined,
      excludedIds: excludedIds ?? undefined,
      archived: archived ?? undefined,
      muted: muted ?? undefined,
      read: read ?? undefined,
      type: type ? ChatTypeBuilder().withValue(type).build() : undefined,
    });
  }

  toPersistence(model: FolderFilter): FolderFilterModel {
    const { includedIds, excludedIds, archived, muted, read, type } = model;

    return FolderFilterModel.build({
      folderId: "",
      includedIds,
      excludedIds,
      archived,
      muted,
      read,
      type: type ? type.value.toString() : "",
    });
  }
}

@Injectable()
export class ItemMapper implements IMapper<Item, ItemModel> {
  toDomain(model: ItemModel): Item {
    const { chatId, pinned, pinnedDate } = model;

    const builder = new EntityBuilder(Item);

    return builder
      .withProps({
        chatId,
        pinned,
        pinnedDate,
      })
      .build();
  }

  toPersistence(model: Item): ItemModel {
    const { chatId, pinned, pinnedDate } = model;

    return ItemModel.build({
      folderId: "",
      chatId,
      pinned,
      pinnedDate,
    });
  }
}

@Injectable()
export class FolderMapper implements IMapper<Folder, FolderModel> {
  constructor(
    // private filterMapper: FolderFilterMapper,
    private folderFilterMapper: FolderFilterMapper,
    private itemMapper: ItemMapper
  ) {}

  toDomain(persistenceModel: FolderModel): Folder {
    const { id, name, ownerUserId, status, filter, items } = persistenceModel;

    const builder = new StateAggregateBuilder(Folder);

    return builder
      .withId(id)
      .withProps({
        name,
        ownerUserId,
        status: FolderStatusBuilder().withValue(status).build(),
        filter: this.folderFilterMapper.toDomain(filter),
        items: items.map((item) => this.itemMapper.toDomain(item)),
      })
      .build();
  }

  toPersistence(domainModel: Folder): FolderModel {
    const { ownerUserId, name, status, filter, items } = domainModel.props();

    const id = domainModel.id();

    const buildOpts: FolderModelCreationAttributes = {
      id,
      ownerUserId,
      name: name,
      status: status.value as string,
      filter: {
        ...this.folderFilterMapper.toPersistence(filter),
        folderId: id,
      },
      items: items.map((item) => {
        const itemModel = this.itemMapper.toPersistence(item);

        return {
          folderId: id,
          chatId: itemModel.chatId,
          pinned: itemModel.pinned,
          pinnedDate: itemModel.pinnedDate,
        };
      }),
    };

    return FolderModel.build(buildOpts, {
      include: [
        {
          model: FolderFilterModel,
          as: "filter",
        },
        {
          model: ItemModel,
          as: "items",
        },
      ],
    });
  }
}

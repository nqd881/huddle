import { Injectable, Type } from "@nestjs/common";
import { Id } from "ddd-node";
import { toIdValues, toIds } from "../../../../application/utils/id";
import { Folder } from "../../../../domain/models/folder/folder";
import { ChatIdFilter } from "../../../../domain/models/folder/folder-filter/chat-id-filter";
import { ChatMutedFilter } from "../../../../domain/models/folder/folder-filter/chat-muted-filter";
import { ChatTypeFilter } from "../../../../domain/models/folder/folder-filter/chat-type-filter";
import { FolderFilter } from "../../../../domain/models/folder/folder-filter/folder-filter";
import { FolderStatus } from "../../../../domain/models/folder/folder-status";
import { ChatType } from "../../../../domain/models/personal-chat/chat-type";
import { IMapper } from "../../../interface/mapper";
import {
  ChatArchivedFilterModel,
  ChatIdFilterModel,
  ChatMutedFilterModel,
  ChatReadFilterModel,
  ChatTypeFilterModel,
  FolderFilterModel,
  FolderModel,
  FolderModelCreationAttributes,
} from "./models";
import { ChatReadFilter } from "../../../../domain/models/folder/folder-filter/chat-read-filter";
import { ChatArchivedFilter } from "../../../../domain/models/folder/folder-filter/chat-archived-filter";
import _ from "lodash";

@Injectable()
export class FolderFilterMapper
  implements IMapper<FolderFilter, FolderFilterModel>
{
  toDomain(model: FolderFilterModel): FolderFilter {
    switch (true) {
      case model instanceof ChatIdFilterModel: {
        const { includedIds, excludedIds } = model as ChatIdFilterModel;

        return new ChatIdFilter({
          includedIds: toIds(includedIds),
          excludedIds: toIds(excludedIds),
        });
      }
      case model instanceof ChatTypeFilterModel: {
        const { type } = model as ChatTypeFilterModel;

        return new ChatTypeFilter({ type: ChatType.parse(type) });
      }
      case model instanceof ChatMutedFilterModel: {
        const { muted } = model as ChatMutedFilterModel;

        return new ChatMutedFilter({ muted });
      }
      case model instanceof ChatReadFilterModel: {
        const { read } = model as ChatReadFilterModel;

        return new ChatReadFilter({ read });
      }
      case model instanceof ChatArchivedFilterModel: {
        const { archived } = model as ChatArchivedFilterModel;

        return new ChatArchivedFilter({ archived });
      }
      default:
        throw new Error("Cannot map model to domain");
    }
  }

  toPersistence(model: FolderFilter): FolderFilterModel {
    switch (true) {
      case model instanceof ChatIdFilter: {
        const { includedIds, excludedIds } = model as ChatIdFilter;

        return ChatIdFilterModel.build({
          folderId: "",
          includedIds: toIdValues(includedIds),
          excludedIds: toIdValues(excludedIds),
        });
      }
      case model instanceof ChatTypeFilter: {
        const { type } = model as ChatTypeFilter;

        return ChatTypeFilterModel.build({
          folderId: "",
          type: type.value as string,
        });
      }
      case model instanceof ChatMutedFilter: {
        const { muted } = model as ChatMutedFilter;

        return ChatMutedFilterModel.build({
          folderId: "",
          muted,
        });
      }
      case model instanceof ChatReadFilter: {
        const { read } = model as ChatReadFilter;

        return ChatReadFilterModel.build({
          folderId: "",
          read,
        });
      }
      case model instanceof ChatArchivedFilter: {
        const { archived } = model as ChatArchivedFilter;

        return ChatArchivedFilterModel.build({
          folderId: "",
          archived,
        });
      }
      default:
        throw new Error("Cannot map model to persistence");
    }
  }
}

@Injectable()
export class FolderMapper implements IMapper<Folder, FolderModel> {
  constructor(private filterMapper: FolderFilterMapper) {}

  toDomain(persistenceModel: FolderModel): Folder {
    const { id, name, ownerUserId, status, filters } = persistenceModel;

    return Folder.newAggregate(
      {
        name,
        ownerUserId: new Id(ownerUserId),
        status: FolderStatus.parse(status),
        filters: filters.map((filter) => this.filterMapper.toDomain(filter)),
      },
      Folder.id(id)
    );
  }

  toPersistence(domainModel: Folder): FolderModel {
    const { ownerUserId, name, status, filters } = domainModel.props();

    const id = domainModel.id();

    const parsedFilters = filters.map((filter) => {
      const parsedFilter = this.filterMapper.toPersistence(filter);

      parsedFilter.folderId = id.value;

      return parsedFilter;
    });

    const findFilter = <T extends FolderFilterModel>(
      filters: FolderFilterModel[],
      model: Type<T>
    ) => {
      return filters.find((filter): filter is T => filter instanceof model);
    };

    const idFilter = findFilter(parsedFilters, ChatIdFilterModel);
    const mutedFilter = findFilter(parsedFilters, ChatMutedFilterModel);
    const readFilter = findFilter(parsedFilters, ChatReadFilterModel);
    const typeFilter = findFilter(parsedFilters, ChatTypeFilterModel);
    const archivedFilter = findFilter(parsedFilters, ChatArchivedFilterModel);

    const buildOpts: FolderModelCreationAttributes = {
      id: id.value,
      ownerUserId: ownerUserId.value,
      name: name,
      status: status.value as string,
    };

    if (idFilter)
      buildOpts.idFilter = {
        folderId: idFilter.folderId,
        includedIds: idFilter.includedIds,
        excludedIds: idFilter.excludedIds,
      };

    if (typeFilter)
      buildOpts.typeFilter = {
        folderId: typeFilter.folderId,
        type: typeFilter.type,
      };

    if (mutedFilter)
      buildOpts.mutedFilter = {
        folderId: mutedFilter.folderId,
        muted: mutedFilter.muted,
      };

    if (readFilter)
      buildOpts.readFilter = {
        folderId: readFilter.folderId,
        read: readFilter.read,
      };

    if (archivedFilter)
      buildOpts.archivedFilter = {
        folderId: archivedFilter.folderId,
        archived: archivedFilter.archived,
      };

    return FolderModel.build(buildOpts, {
      include: [
        {
          model: ChatIdFilterModel,
          as: "idFilter",
        },
        {
          model: ChatMutedFilterModel,
          as: "mutedFilter",
        },
        {
          model: ChatTypeFilterModel,
          as: "typeFilter",
        },
        {
          model: ChatReadFilterModel,
          as: "readFilter",
        },
        {
          model: ChatArchivedFilterModel,
          as: "archivedFilter",
        },
      ],
    });
  }
}

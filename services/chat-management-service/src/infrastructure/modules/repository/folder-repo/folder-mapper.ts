import { Injectable } from "@nestjs/common";
import { Id } from "ddd-node";
import { Folder } from "../../../../domain/models/folder/folder";
import { Selection } from "../../../../domain/models/folder/selection";
import { IMapper } from "../_interfaces/mapper";
import { FolderModel, SelectionModel } from "./folder-model";

@Injectable()
export class FolderMapper implements IMapper<FolderModel, Folder> {
  toDomain(persistenceModel: FolderModel): Folder {
    const { id, name, ownerUserId } = persistenceModel;

    return Folder.newAggregate(
      {
        name,
        ownerUserId: new Id(ownerUserId),
        includeSelection: Selection.newSelection(),
        excludeSelection: Selection.newSelection(),
      },
      new Id(id)
    );
  }

  toPersistence(domainModel: Folder): FolderModel {
    const { ownerUserId, name, includeSelection, excludeSelection } =
      domainModel.props();

    const id = domainModel.getId();

    return FolderModel.build(
      {
        id: id.value,
        ownerUserId: ownerUserId.value,
        name: name,
        includeSelectionId: includeSelection.getId().value,
        excludeSelectionId: excludeSelection.getId().value,
        includeSelection: {
          id: includeSelection.getId().value,
          folderId: id.value,
          type: "include",
        },
        excludeSelection: {
          id: excludeSelection.getId().value,
          folderId: id.value,
          type: "exclude",
        },
      },
      {
        include: [
          {
            model: SelectionModel,
            as: "includeSelection",
          },
          {
            model: SelectionModel,
            as: "excludeSelection",
          },
        ],
      }
    );
  }
}

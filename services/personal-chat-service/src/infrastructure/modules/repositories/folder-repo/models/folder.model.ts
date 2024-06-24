import { isNil } from "lodash";
import { Optional } from "sequelize";
import {
  Column,
  DataType,
  HasOne,
  Model,
  PrimaryKey,
  Scopes,
  Table,
} from "sequelize-typescript";
import {
  ChatArchivedFilterModel,
  ChatArchivedFilterModelAttributes,
  ChatIdFilterModel,
  ChatIdFilterModelAttributes,
  ChatMutedFilterModel,
  ChatMutedFilterModelAttributes,
  ChatReadFilterModel,
  ChatReadFilterModelAttributes,
  ChatTypeFilterModel,
  ChatTypeFilterModelAttributes,
  FolderFilterModel,
} from "./folder-filter.model";

export interface FolderModelAttributes {
  id: string;
  name: string;
  ownerUserId: string;
  status: string;
}

export interface FolderModelCreationAttributes
  extends Optional<FolderModelAttributes, "id"> {
  idFilter?: ChatIdFilterModelAttributes;
  mutedFilter?: ChatMutedFilterModelAttributes;
  typeFilter?: ChatTypeFilterModelAttributes;
  readFilter?: ChatReadFilterModelAttributes;
  archivedFilter?: ChatArchivedFilterModelAttributes;
}

@Table({
  tableName: "folders",
  createdAt: false,
  updatedAt: false,
})
@Scopes(() => ({
  withFilters: {
    include: [
      {
        model: ChatIdFilterModel,
        as: "idFilter",
      },
      {
        model: ChatTypeFilterModel,
        as: "typeFilter",
      },
      {
        model: ChatMutedFilterModel,
        as: "mutedFilter",
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
  },
}))
export class FolderModel extends Model<
  FolderModelAttributes,
  FolderModelCreationAttributes
> {
  @PrimaryKey
  @Column
  declare id: string;

  @Column
  declare name: string;

  @Column
  declare ownerUserId: string;

  @Column
  declare status: string;

  @HasOne(() => ChatIdFilterModel, "folderId")
  declare idFilter?: ChatIdFilterModel;

  @HasOne(() => ChatTypeFilterModel, "folderId")
  declare typeFilter?: ChatTypeFilterModel;

  @HasOne(() => ChatMutedFilterModel, "folderId")
  declare mutedFilter?: ChatMutedFilterModel;

  @HasOne(() => ChatReadFilterModel, "folderId")
  declare readFilter?: ChatReadFilterModel;

  @HasOne(() => ChatArchivedFilterModel, "folderId")
  declare archivedFilter?: ChatArchivedFilterModel;

  get filters(): FolderFilterModel[] {
    const filters = [
      this.idFilter,
      this.typeFilter,
      this.mutedFilter,
      this.readFilter,
      this.archivedFilter,
    ];

    return filters.filter((filter) => !isNil(filter)) as FolderFilterModel[];
  }
}

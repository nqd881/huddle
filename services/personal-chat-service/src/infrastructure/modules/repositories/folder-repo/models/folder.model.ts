import { isNil } from "lodash";
import { Optional } from "sequelize";
import {
  Column,
  DataType,
  HasMany,
  HasOne,
  Model,
  PrimaryKey,
  Scopes,
  Table,
} from "sequelize-typescript";
// import {
//   ChatArchivedFilterModel,
//   ChatArchivedFilterModelAttributes,
//   ChatIdFilterModel,
//   ChatIdFilterModelAttributes,
//   ChatMutedFilterModel,
//   ChatMutedFilterModelAttributes,
//   ChatReadFilterModel,
//   ChatReadFilterModelAttributes,
//   ChatTypeFilterModel,
//   ChatTypeFilterModelAttributes,
//   FolderFilterModel,
// } from "./folder-filter.model";
import { ItemModel, ItemModelAttributes } from "./item.model";
import { FolderFilterModel, FolderFilterModelCreationAttributes } from ".";

export interface FolderModelAttributes {
  id: string;
  name: string;
  ownerUserId: string;
  status: string;
}

export interface FolderModelCreationAttributes
  extends Optional<FolderModelAttributes, "id"> {
  filter?: FolderFilterModelCreationAttributes;
  items?: ItemModelAttributes[];
}

@Table({
  tableName: "folders",
  createdAt: false,
  updatedAt: false,
})
@Scopes(() => ({
  withFilter: {
    include: [
      {
        model: FolderFilterModel,
        as: "filter",
      },
    ],
  },
  withItems: {
    include: [
      {
        model: ItemModel,
        as: "items",
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

  @HasOne(() => FolderFilterModel, "folderId")
  declare filter: FolderFilterModel;

  @HasMany(() => ItemModel, "folderId")
  declare items: ItemModel[];
}

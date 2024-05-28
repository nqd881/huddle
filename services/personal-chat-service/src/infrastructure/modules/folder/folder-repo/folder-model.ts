import { Optional } from "sequelize";
import {
  Column,
  HasMany,
  Model,
  PrimaryKey,
  Scopes,
  Table,
} from "sequelize-typescript";

export interface PinnedItemModelAttributes {
  folderId: string;
  chatId: string;
  pinnedDate: Date;
}

export interface PinnedItemModelCreationAttributes
  extends Omit<PinnedItemModelAttributes, "id"> {}

@Table({
  tableName: "pinned_items",
  createdAt: false,
  updatedAt: false,
})
export class PinnedItemModel extends Model<
  PinnedItemModelAttributes,
  PinnedItemModelCreationAttributes
> {
  @Column({ primaryKey: true })
  declare folderId: string;

  @Column({ primaryKey: true })
  declare chatId: string;

  @Column
  declare pinnedDate: Date;
}

// Folder

export interface FolderModelAttributes {
  id: string;
  name: string;
  ownerUserId: string;
  pinnedItems: PinnedItemModelAttributes[];
}

export interface FolderModelCreationAttributes
  extends Optional<FolderModelAttributes, "id"> {}

@Scopes(() => ({
  full: {
    include: [
      {
        model: PinnedItemModel,
        as: "pinnedItems",
      },
    ],
  },
}))
@Table({
  tableName: "folders",
  createdAt: false,
  updatedAt: false,
})
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

  @HasMany(() => PinnedItemModel, { foreignKey: "folderId" })
  declare pinnedItems: PinnedItemModel[];
}

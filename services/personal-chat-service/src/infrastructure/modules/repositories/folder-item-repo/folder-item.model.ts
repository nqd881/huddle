import { Optional } from "sequelize";
import { Column, Model, PrimaryKey, Table } from "sequelize-typescript";

export interface FolderItemModelAttributes {
  id: string;
  folderId: string;
  chatId: string;
  pinned: boolean;
  pinnedDate?: number;
}

export interface FolderItemModelCreationAttributes
  extends Optional<FolderItemModelAttributes, "id"> {}

@Table({
  tableName: "folder_items",
  createdAt: false,
  updatedAt: false,
})
export class FolderItemModel extends Model<
  FolderItemModelAttributes,
  FolderItemModelCreationAttributes
> {
  @PrimaryKey
  @Column
  declare id: string;

  @Column
  declare folderId: string;

  @Column
  declare chatId: string;

  @Column
  declare pinned: boolean;

  @Column
  declare pinnedDate?: number;
}

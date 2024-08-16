import {
  AllowNull,
  Column,
  DataType,
  Index,
  Model,
  PrimaryKey,
  Table,
} from "sequelize-typescript";

export interface ItemModelAttributes {
  folderId: string;
  chatId: string;
  pinned: boolean;
  pinnedDate?: Date;
}

@Table({
  tableName: "items",
  createdAt: false,
  updatedAt: false,
})
export class ItemModel extends Model<ItemModelAttributes> {
  @PrimaryKey
  @Column
  declare folderId: string;

  @PrimaryKey
  @Column
  declare chatId: string;

  @Column
  declare pinned: boolean;

  @AllowNull
  @Column(DataType.DATE)
  declare pinnedDate?: Date;
}

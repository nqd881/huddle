import {
  Column,
  ForeignKey,
  Model,
  PrimaryKey,
  Table,
} from "sequelize-typescript";
import { FolderModel } from "../folder-repo/folder-model";

@Table({
  tableName: "items",
  createdAt: false,
  updatedAt: false,
})
export class ItemModel extends Model {
  @PrimaryKey
  @Column
  declare id: string;

  @ForeignKey(() => FolderModel)
  @Column
  declare folderId: string;

  @Column
  declare pinned: boolean;

  @Column
  declare position?: number;
}

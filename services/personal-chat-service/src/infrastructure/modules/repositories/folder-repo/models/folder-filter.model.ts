import { DataTypes } from "sequelize";
import {
  AllowNull,
  Column,
  Model,
  PrimaryKey,
  Table,
} from "sequelize-typescript";
import { SetRequired } from "type-fest";

export interface FolderFilterModelAttributes {
  folderId: string;
  includedIds: string[] | null;
  excludedIds: string[] | null;
  archived: boolean | null;
  muted: boolean | null;
  read: boolean | null;
  type: string | null;
}

export interface FolderFilterModelCreationAttributes
  extends SetRequired<Partial<FolderFilterModelAttributes>, "folderId"> {}

@Table({ tableName: "folder_filter", createdAt: false, updatedAt: false })
export class FolderFilterModel extends Model<
  FolderFilterModelAttributes,
  FolderFilterModelCreationAttributes
> {
  @PrimaryKey
  @Column
  declare folderId: string;

  @AllowNull
  @Column(DataTypes.ARRAY(DataTypes.STRING))
  declare includedIds: string[] | null;

  @AllowNull
  @Column(DataTypes.ARRAY(DataTypes.STRING))
  declare excludedIds: string[] | null;

  @AllowNull
  @Column(DataTypes.BOOLEAN)
  declare archived: boolean | null;

  @AllowNull
  @Column(DataTypes.BOOLEAN)
  declare muted: boolean | null;

  @AllowNull
  @Column(DataTypes.BOOLEAN)
  declare read: boolean | null;

  @AllowNull
  @Column(DataTypes.STRING)
  declare type: string | null;
}

import {
  Column,
  DataType,
  Model,
  PrimaryKey,
  Table,
} from "sequelize-typescript";

export interface FolderFilterModelAttributes {
  folderId: string;
}

export class FolderFilterModel<
    T extends FolderFilterModelAttributes = FolderFilterModelAttributes
  >
  extends Model<T>
  implements FolderFilterModelAttributes
{
  @PrimaryKey
  @Column
  declare folderId: string;
}

export interface ChatIdFilterModelAttributes
  extends FolderFilterModelAttributes {
  includedIds: string[];
  excludedIds: string[];
}

@Table({
  tableName: "chat_id_filter",
  createdAt: false,
  updatedAt: false,
})
export class ChatIdFilterModel extends FolderFilterModel<ChatIdFilterModelAttributes> {
  @Column(DataType.ARRAY(DataType.STRING))
  declare includedIds: string[];

  @Column(DataType.ARRAY(DataType.STRING))
  declare excludedIds: string[];
}

export interface ChatTypeFilterModelAttributes
  extends FolderFilterModelAttributes {
  type: string;
}

@Table({
  tableName: "chat_type_filter",
  createdAt: false,
  updatedAt: false,
})
export class ChatTypeFilterModel extends FolderFilterModel<ChatTypeFilterModelAttributes> {
  @Column
  declare type: string;
}

export interface ChatMutedFilterModelAttributes
  extends FolderFilterModelAttributes {
  muted: boolean;
}

@Table({
  tableName: "chat_muted_filter",
  createdAt: false,
  updatedAt: false,
})
export class ChatMutedFilterModel extends FolderFilterModel<ChatMutedFilterModelAttributes> {
  @Column
  declare muted: boolean;
}

export interface ChatArchivedFilterModelAttributes
  extends FolderFilterModelAttributes {
  archived: boolean;
}

@Table({
  tableName: "chat_archived_filter",
  createdAt: false,
  updatedAt: false,
})
export class ChatArchivedFilterModel extends FolderFilterModel<ChatArchivedFilterModelAttributes> {
  @Column
  declare archived: boolean;
}

export interface ChatReadFilterModelAttributes
  extends FolderFilterModelAttributes {
  read: boolean;
}

@Table({
  tableName: "chat_read_filter",
  createdAt: false,
  updatedAt: false,
})
export class ChatReadFilterModel extends FolderFilterModel<ChatReadFilterModelAttributes> {
  @Column
  declare read: boolean;
}

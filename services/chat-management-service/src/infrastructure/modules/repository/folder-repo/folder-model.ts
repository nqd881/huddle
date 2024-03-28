import {
  Column,
  ForeignKey,
  HasMany,
  HasOne,
  Model,
  PrimaryKey,
  Scopes,
  Table,
} from "sequelize-typescript";

export class CriterionModel extends Model {
  @Column
  declare selectionId: string;

  @Column
  declare type: string;
}

@Table({
  tableName: "id_criteria",
  createdAt: false,
  updatedAt: false,
})
export class IdCriterionModel extends CriterionModel {
  @Column
  declare ids: string;
}

@Table({
  tableName: "tag_criteria",
  createdAt: false,
  updatedAt: false,
})
export class TagCriterionModel extends CriterionModel {
  @Column
  declare tags: string;
}

@Table({
  tableName: "archived_criteria",
  createdAt: false,
  updatedAt: false,
})
export class ArchivedCriterionModel extends CriterionModel {
  @Column
  declare isArchived: boolean;
}

@Scopes(() => ({
  full: {
    include: [{ model: IdCriterionModel, as: "idCriteria" }],
  },
}))
@Table({
  tableName: "selections",
  createdAt: false,
  updatedAt: false,
})
export class SelectionModel extends Model {
  @PrimaryKey
  @Column
  declare id: string;

  @ForeignKey(() => FolderModel)
  @Column
  declare folderId: string;

  @Column
  declare type: "include" | "exclude";

  @HasMany(() => IdCriterionModel, "selectionId")
  declare idCriteria: IdCriterionModel[];
}

@Scopes(() => ({
  full: {
    include: [
      {
        model: SelectionModel,
        as: "includeSelection",
        where: {
          type: "include",
        },
      },
      {
        model: SelectionModel,
        as: "excludeSelection",
        where: {
          type: "exclude",
        },
      },
    ],
  },
}))
@Table({
  tableName: "folders",
  createdAt: false,
  updatedAt: false,
})
export class FolderModel extends Model {
  @PrimaryKey
  @Column
  declare id: string;

  @Column
  declare name: string;

  @Column
  declare ownerUserId: string;

  @HasOne(() => SelectionModel)
  includeSelection: SelectionModel;

  @HasOne(() => SelectionModel)
  excludeSelection: SelectionModel;
}

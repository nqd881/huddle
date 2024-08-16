import { Column, Model, PrimaryKey, Table } from "sequelize-typescript";

export interface UserModelAttributes {
  id: string;
  status: string;
}

@Table({
  tableName: "users",
  createdAt: false,
  updatedAt: false,
})
export class UserModel extends Model<UserModelAttributes> {
  @PrimaryKey
  @Column
  declare id: string;

  @Column
  declare status: string;
}

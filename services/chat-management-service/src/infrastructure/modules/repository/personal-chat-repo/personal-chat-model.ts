import { CreationAttributes } from "sequelize";
import {
  Column,
  HasMany,
  Model,
  PrimaryKey,
  Table,
} from "sequelize-typescript";

// @Table
// export class TagModel extends Model {
//   @Column
//   name: string;

//   @Column
//   value: string;
// }

// export interface PersonalChatModelAttributes {
//   id: string;
//   sourceChatId: string;
//   ownerUserId: string;
//   archived: boolean;
// }

@Table({ tableName: "personal_chats", createdAt: false, updatedAt: false })
export class PersonalChatModel extends Model {
  // @PrimaryKey
  @Column({
    primaryKey: true,
  })
  declare id: string;

  @Column
  sourceChatId: string;

  @Column
  ownerUserId: string;

  @Column
  archived: boolean;

  // @HasMany(() => TagModel)
  // tags: TagModel[];
}

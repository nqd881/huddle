import { Column, Model, Table } from "sequelize-typescript";

@Table({ tableName: "personal_chats", createdAt: false, updatedAt: false })
export class PersonalChatModel extends Model {
  @Column({
    primaryKey: true,
  })
  declare id: string;

  @Column
  declare type: string;

  @Column
  declare sourceChatId: string;

  @Column
  declare ownerUserId: string;

  @Column
  declare archived: boolean;
}

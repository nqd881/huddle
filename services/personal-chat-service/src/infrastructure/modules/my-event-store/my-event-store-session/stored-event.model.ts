import {
  Column,
  DataType,
  Model,
  PrimaryKey,
  Table,
} from "sequelize-typescript";

export interface StoredEventModelAttributes {
  eventModelId: string;
  eventType: string;
  eventId: string;
  eventOccurredOn: Date;
  eventSource: string;
  eventPayload: string;
}

export interface StoredEventModelCreationAttributes {}

@Table({
  tableName: "events",
  createdAt: false,
  updatedAt: false,
})
export class StoredEventModel extends Model<
  StoredEventModelAttributes,
  StoredEventModelCreationAttributes
> {
  @PrimaryKey
  @Column
  declare eventId: string;

  @Column
  declare eventModelId: string;

  @Column
  declare eventType: string;

  @Column(DataType.DATE)
  declare eventOccurredOn: Date;

  @Column
  declare eventSource: string;

  @Column
  declare eventPayload: string;
}

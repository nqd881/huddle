import {
  Column,
  DataType,
  Model,
  PrimaryKey,
  Table,
} from "sequelize-typescript";

export interface StoredEventModelAttributes {
  eventModelName: string;
  eventModelVersion: number;
  eventType: string;
  eventId: string;
  eventOccurredOn: Date;
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
  declare eventModelName: string;

  @Column
  declare eventModelVersion: number;

  @Column
  declare eventType: string;

  @Column(DataType.DATE)
  declare eventOccurredOn: Date;

  @Column
  declare eventPayload: string;
}

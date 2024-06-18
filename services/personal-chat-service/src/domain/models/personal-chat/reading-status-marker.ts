import { Enum, EnumBase, Prop, ValueObjectBase } from "ddd-node";

export class ReadingStatus extends EnumBase {
  @Enum("read")
  static Read: ReadingStatus;

  @Enum("unread")
  static UnRead: ReadingStatus;
}

export interface ReadingStatusMarkerProps {
  status: ReadingStatus;
  markedDate: Date;
}

export class ReadingStatusMarker extends ValueObjectBase<ReadingStatusMarkerProps> {
  static newMarker(status: ReadingStatus) {
    return new ReadingStatusMarker({
      status,
      markedDate: new Date(),
    });
  }

  @Prop()
  declare status: ReadingStatus;

  @Prop()
  declare markedDate: Date;
}

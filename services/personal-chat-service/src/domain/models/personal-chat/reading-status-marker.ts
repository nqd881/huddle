import {
  Enum,
  EnumBase,
  Prop,
  ValueObjectBase,
  ValueObjectBuilder,
} from "ddd-node";

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
  @Prop()
  declare status: ReadingStatus;

  @Prop()
  declare markedDate: Date;
}

export class ReadingStatusMarkerBuilder extends ValueObjectBuilder<ReadingStatusMarker> {
  protected status?: ReadingStatus;
  protected markedDate = new Date();

  constructor() {
    super(ReadingStatusMarker);
  }

  withStatus(status: ReadingStatus) {
    this.status = status;
    return this;
  }

  withMarkedDate(date: Date) {
    this.markedDate = date;
    return this;
  }

  build(): ReadingStatusMarker {
    if (this.props) return super.build();

    if (!this.status) throw new Error();

    this.withProps({ status: this.status, markedDate: this.markedDate });

    return super.build();
  }
}

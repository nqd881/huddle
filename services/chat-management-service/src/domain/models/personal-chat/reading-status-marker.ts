import { ValueObject, valueObject } from "ddd-node";

export enum ReadingStatus {
  Read,
  Unread,
}

export interface ReadingStatusMarkerProps {
  status: ReadingStatus;
  markedDate: Date;
}

@valueObject()
export class ReadingStatusMarker extends ValueObject<ReadingStatusMarkerProps> {
  static newMarker(status: ReadingStatus) {
    return new ReadingStatusMarker({
      status,
      markedDate: new Date(),
    });
  }

  get status() {
    return this._props.status;
  }

  get markedDate() {
    return this._props.markedDate;
  }
}

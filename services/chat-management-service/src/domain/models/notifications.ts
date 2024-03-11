import { ValueObject, valueObject } from "ddd-node";

export interface NotificationsProps {
  muteUntil?: Date;
}

@valueObject()
export class Notifications extends ValueObject<NotificationsProps> {
  static readonly None = new Notifications({});

  get muteUntil() {
    return this._props.muteUntil;
  }
}

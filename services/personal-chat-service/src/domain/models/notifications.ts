import { Prop, Static, ValueObjectBase } from "ddd-node";

export interface NotificationsProps {
  muteUntil?: Date;
}

export class Notifications extends ValueObjectBase<NotificationsProps> {
  @Static(() => new Notifications({}))
  static readonly None: Notifications;

  @Prop()
  muteUntil?: Date;
}

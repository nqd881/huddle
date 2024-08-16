import { Prop, ValueObjectBase } from "ddd-node";

export interface ChatNotificationsProps {
  enabled: boolean;
  mutedUntil?: Date;
}

export class ChatNotifications extends ValueObjectBase<ChatNotificationsProps> {
  @Prop()
  declare enabled: boolean;

  @Prop()
  declare mutedUntil?: Date;
}

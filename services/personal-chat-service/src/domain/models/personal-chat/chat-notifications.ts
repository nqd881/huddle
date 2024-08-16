import { Prop, StateAggregateBase } from "ddd-node";

export interface ChatNotificationsProps {
  enabled: boolean;
  muteUntil?: Date;
}

export class ChatNotifications extends StateAggregateBase<ChatNotificationsProps> {
  @Prop()
  declare enabled: boolean;

  @Prop()
  declare muteUntil?: Date;

  isMuted() {
    return (
      !this.enabled && Date.now() < (this.muteUntil?.getTime() ?? Infinity)
    );
  }

  mute(muteUntil?: Date) {
    this._props.enabled = false;
    this._props.muteUntil = muteUntil;
  }

  unmute() {
    this._props.enabled = true;
    this._props.muteUntil = undefined;
  }
}

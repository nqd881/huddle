import { Event, event } from "ddd-node";

export interface PersonalChatNotificationsUpdatedProps {}

@event()
export class PersonalChatNotificationsUpdated extends Event<PersonalChatNotificationsUpdatedProps> {}

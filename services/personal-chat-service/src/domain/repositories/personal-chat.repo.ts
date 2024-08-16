import { IRepository, Id } from "ddd-node";
import { PersonalChat } from "../models/personal-chat/personal-chat";
import { ChatDescriptor } from "../models/personal-chat/chat-descriptor";

export interface IPersonalChatRepo extends IRepository<PersonalChat> {
  allChatDescriptorsOfUser(userId: Id): Promise<ChatDescriptor[]>;
}

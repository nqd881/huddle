import { IRepository } from "ddd-node";
import { PersonalChat } from "../models/personal-chat/personal-chat";

export interface IPersonalChatRepo extends IRepository<PersonalChat> {}

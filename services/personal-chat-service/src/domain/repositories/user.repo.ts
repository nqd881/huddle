import { IRepository, Id } from "ddd-node";
import { User } from "../models/user/user";

export interface IUserRepo extends IRepository<User> {
  userOfId(userId: Id): Promise<User | null>;
}

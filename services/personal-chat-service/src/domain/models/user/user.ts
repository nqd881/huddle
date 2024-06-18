import { Prop, StateAggregateBase } from "ddd-node";
import { UserStatus } from "./user-status";

export interface UserProps {
  status: UserStatus;
}

export class User extends StateAggregateBase<UserProps> {
  @Prop()
  declare status: UserStatus;

  createFolder() {}
}

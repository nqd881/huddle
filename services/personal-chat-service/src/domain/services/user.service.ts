import { Id } from "ddd-node";
import { UserBuilder } from "../models/user/user";
import { UserStatus } from "../models/user/user-status";

export class UserService {
  static createUser(userId: Id) {
    const newUser = UserBuilder()
      .withId(userId)
      .withProps({
        status: UserStatus.Active,
      })
      .build();

    return newUser;
  }
}

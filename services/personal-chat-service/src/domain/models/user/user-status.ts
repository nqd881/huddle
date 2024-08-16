import { Enum, EnumBase, EnumBuilder } from "ddd-node";

export class UserStatus extends EnumBase {
  @Enum("active")
  static Active: UserStatus;

  @Enum("inactive")
  static Inactive: UserStatus;

  isActive() {
    return this === UserStatus.Active;
  }

  isInactive() {
    return this === UserStatus.Inactive;
  }
}

export const UserStatusBuilder = () => new EnumBuilder(UserStatus);

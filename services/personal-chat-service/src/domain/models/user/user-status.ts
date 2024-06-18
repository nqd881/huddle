import { Enum, EnumBase } from "ddd-node";

export class UserStatus extends EnumBase {
  @Enum("active")
  static Active: UserStatus;

  @Enum("inactive")
  static Inactive: UserStatus;

  isActive() {
    return this.equals(UserStatus.Active);
  }

  isInactive() {
    return this.equals(UserStatus.Inactive);
  }
}

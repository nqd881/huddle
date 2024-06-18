import { Enum, EnumBase } from "ddd-node";

export class FolderStatus extends EnumBase {
  @Enum("active")
  static Active: FolderStatus;

  @Enum("deleted")
  static Deleted: FolderStatus;

  isActive() {
    return this.equals(FolderStatus.Active);
  }

  isDeleted() {
    return this.equals(FolderStatus.Deleted);
  }
}

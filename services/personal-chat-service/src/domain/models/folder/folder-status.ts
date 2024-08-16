import { Enum, EnumBase, EnumBuilder } from "ddd-node";

export class FolderStatus extends EnumBase {
  @Enum("active")
  static Active: FolderStatus;

  @Enum("deleted")
  static Deleted: FolderStatus;

  isActive() {
    return this === FolderStatus.Active;
  }

  isDeleted() {
    return this === FolderStatus.Deleted;
  }
}

export const FolderStatusBuilder = () => new EnumBuilder(FolderStatus);

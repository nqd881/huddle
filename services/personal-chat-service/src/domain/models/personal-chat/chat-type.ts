import { Enum, EnumBase } from "ddd-node";

export class ChatType extends EnumBase {
  @Enum("private")
  static Private: ChatType;

  @Enum("group")
  static Group: ChatType;

  @Enum("channel")
  static Channel: ChatType;
}

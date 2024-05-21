import { ChatType } from "../../../../domain/models/personal-chat/chat-type";

export class CreatePersonalChatCommand {
  constructor(
    public readonly sourceChatId: string,
    public readonly ownerUserId: string,
    public readonly type: ChatType
  ) {}
}

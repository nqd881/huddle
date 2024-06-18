import { Body, Controller, Inject, Param, Post } from "@nestjs/common";
import { PersonalChatAppService } from "../../../application/services/personal-chat-service/personal-chat-service";
import { PERSONAL_CHAT_APP_SERVICE } from "./token";
import { CreatePersonalChatCommand } from "../../../application/services/personal-chat-service/create-personal-chat";
import { ArchivePersonalChatCommand } from "../../../application/services/personal-chat-service/archive-personal-chat";

export interface PersonalChatParamsOfUser {
  userId: string;
}

@Controller("personal_chats")
export class PersonalChatController {
  constructor(
    @Inject(PERSONAL_CHAT_APP_SERVICE)
    private personalChatAppService: PersonalChatAppService
  ) {}

  @Post()
  async create(
    @Body() body: { ownerUserId: string; sourceChatId: string; type: string }
  ) {
    const { sourceChatId, ownerUserId, type } = body;

    await this.personalChatAppService.createPersonalChat(
      new CreatePersonalChatCommand({
        sourceChatId,
        ownerUserId,
        type,
      })
    );
  }

  @Post(":personal_chat_id/archive")
  async archive(@Param("personal_chat_id") personalChatId: string) {
    await this.personalChatAppService.archivePersonalChat(
      new ArchivePersonalChatCommand({ personalChatId })
    );
  }
}

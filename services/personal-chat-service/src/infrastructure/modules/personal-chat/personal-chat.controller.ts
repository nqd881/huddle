import { Body, Controller, Param, Post } from "@nestjs/common";
import { ArchivePersonalChatCommand } from "../../../application/services/personal-chat-service/archive-personal-chat";
import { CreatePersonalChatCommand } from "../../../application/services/personal-chat-service/create-personal-chat";
import { CommandBus } from "../command-bus/command-bus";

export interface PersonalChatParamsOfUser {
  userId: string;
}

@Controller("personal_chats")
export class PersonalChatController {
  constructor(private commandBus: CommandBus) {}

  @Post()
  async create(
    @Body() body: { ownerUserId: string; sourceChatId: string; type: string }
  ) {
    const { sourceChatId, ownerUserId, type } = body;

    const command = new CreatePersonalChatCommand({
      sourceChatId,
      ownerUserId,
      type,
    });

    await this.commandBus.executeCommand(command);
  }

  @Post(":personal_chat_id/archive")
  archive(@Param("personal_chat_id") personalChatId: string) {
    const command = new ArchivePersonalChatCommand({ personalChatId });

    this.commandBus.executeCommand(command);
  }
}

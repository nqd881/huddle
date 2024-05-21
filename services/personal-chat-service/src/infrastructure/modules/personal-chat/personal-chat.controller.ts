import { Body, Controller, Param, Post } from "@nestjs/common";
import { v4 } from "uuid";
import { ArchivePersonalChatCommand } from "../../../application/services/personal-chat-service/archive-personal-chat";
import { CreatePersonalChatCommand } from "../../../application/services/personal-chat-service/create-personal-chat";
import { ChatType } from "../../../domain/models/personal-chat/chat-type";
import { CommandBus } from "../command-bus/command-bus";

export interface PersonalChatParamsOfUser {
  userId: string;
}

@Controller("personal_chats")
export class PersonalChatController {
  constructor(private commandBus: CommandBus) {}

  @Post()
  async create(@Body() body: { userId: string }) {
    const { userId } = body;

    const sourceChatId = v4();

    const command = new CreatePersonalChatCommand(
      sourceChatId,
      userId,
      ChatType.Private
    );

    await this.commandBus.executeCommand(command);
  }

  @Post(":personal_chat_id/archive")
  archive(@Param("personal_chat_id") personalChatId: string) {
    const command = new ArchivePersonalChatCommand(personalChatId);

    this.commandBus.executeCommand(command);
  }
}

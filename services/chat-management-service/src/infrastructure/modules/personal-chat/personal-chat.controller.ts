import { Controller, Get, Inject, Param, Post } from "@nestjs/common";
import { v4 } from "uuid";
import { ArchivePersonalChatCommand } from "../../../application/services/personal-chat-service/archive-personal-chat";
import { CreatePersonalChatCommand } from "../../../application/services/personal-chat-service/create-personal-chat";
import { IPersonalChatRepo } from "../../../domain/repositories/personal-chat.repo";
import { CommandBus } from "../command-bus/command-bus";
import { Repository } from "../repository/token";

export interface PersonalChatParamsOfUser {
  userId: string;
}

@Controller("personal_chats")
export class PersonalChatController {
  constructor(
    private commandBus: CommandBus,
    @Inject(Repository.PersonalChat) private personalChatRepo: IPersonalChatRepo
  ) {}

  @Get()
  getAll() {
    return this.personalChatRepo.findAll();
  }

  @Post()
  create() {
    const command = new CreatePersonalChatCommand(v4(), v4(), [
      "friend:true",
      "colleage:false",
    ]);

    this.commandBus.executeCommand(command);
  }

  @Post(":personal_chat_id/archive")
  archive(@Param("personal_chat_id") personalChatId: string) {
    const command = new ArchivePersonalChatCommand(personalChatId);

    this.commandBus.executeCommand(command);
  }
}

import { Body, Controller, Inject, Param, Post } from "@nestjs/common";
import { App } from "../../../application/app";
import { ArchivePersonalChatCommand } from "../../../application/use-cases/personal-chat/archive-personal-chat";
import { CreatePersonalChatCommand } from "../../../application/use-cases/personal-chat/create-chat";
import { AppCoreToken } from "../app-core";
import { ClsService } from "nestjs-cls";
import { MyClsStore } from "../my-cls";

export interface PersonalChatParamsOfUser {
  userId: string;
}

@Controller("personal_chats")
export class PersonalChatController {
  constructor(
    @Inject(AppCoreToken) private appCore: App,
    private clsService: ClsService<MyClsStore>
  ) {}

  @Post()
  async create(
    @Body() body: { ownerUserId: string; sourceChatId: string; type: string }
  ) {
    const { sourceChatId, ownerUserId, type } = body;

    const userId = this.clsService.get("userId");

    if (!userId) return;

    await this.appCore.handleCommand(
      new CreatePersonalChatCommand(
        {
          sourceChatId,
          ownerUserId,
          type,
        },
        { userId }
      )
    );
  }

  @Post(":personal_chat_id/archive")
  async archive(@Param("personal_chat_id") personalChatId: string) {
    await this.appCore.handleCommand(
      new ArchivePersonalChatCommand(
        { personalChatId },
        { userId: this.clsService.get("userId") }
      )
    );
  }
}

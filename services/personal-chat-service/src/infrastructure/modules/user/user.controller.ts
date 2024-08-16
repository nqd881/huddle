import { Body, Controller, Inject, Param, Post } from "@nestjs/common";
import { ClsService } from "nestjs-cls";
import { AppCoreToken } from "../app-core";
import { App } from "../../../application/app";
import { CreateFolderCommand } from "../../../application/use-cases/user/create-folder";
import { UserRequest } from "./request";
import { CreateUserCommand } from "../../../application/use-cases/user/create-user";
import { CreatePersonalChatCommand } from "../../../application/use-cases/personal-chat/create-chat";

@Controller("users")
export class UserController {
  constructor(
    @Inject(AppCoreToken) private appCore: App,
    private clsService: ClsService
  ) {}

  // Just for dev
  @Post(":user_id")
  async createUser(@Param("user_id") userId: string) {
    await this.appCore.handleCommand(new CreateUserCommand({ userId }));
  }

  @Post(":user_id/folders")
  async createFolder(
    @Param("user_id") userId: string,
    @Body() body: UserRequest.CreateFolderBody
  ) {
    const { name } = body;

    await this.appCore.handleCommand(
      new CreateFolderCommand({ name }, { userId })
    );
  }

  @Post(":user_id/personal_chats")
  async createPersonalChat(
    @Param("user_id") userId: string,
    @Body() body: { sourceChatId: string; type: string }
  ) {
    const { sourceChatId, type } = body;

    await this.appCore.handleCommand(
      new CreatePersonalChatCommand(
        {
          ownerUserId: userId,
          sourceChatId,
          type,
        },
        { userId }
      )
    );
  }
}

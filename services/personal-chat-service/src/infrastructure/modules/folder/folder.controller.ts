import { Body, Controller, Delete, Param, Post, Put } from "@nestjs/common";
import { CreateFolderCommand } from "../../../application/services/folder-service/create-folder";
import { PinChatCommand } from "../../../application/services/folder-service/pin-chat";
import { RenameFolderCommand } from "../../../application/services/folder-service/rename-folder";
import { UnpinChatCommand } from "../../../application/services/folder-service/unpin-chat";
import { CommandBus } from "../command-bus/command-bus";
import { RemoveFolderCommand } from "../../../application/services/folder-service/remove-folder";

export interface CreateFolderRequestBody {
  name: string;
}
@Controller("folders")
export class FolderController {
  constructor(private commandBus: CommandBus) {}

  @Post()
  async createFolder(@Body() body: CreateFolderRequestBody) {
    const { name } = body;

    const command = new CreateFolderCommand({ name });

    await this.commandBus.executeCommand(command);
  }

  @Put(":folder_id/name")
  async renameFolder(
    @Param("folder_id") folderId: string,
    @Body() body: { name: string }
  ) {
    const { name } = body;

    const command = new RenameFolderCommand({ folderId, name });

    await this.commandBus.executeCommand(command);
  }

  @Post(":folder_id/pin")
  async pinChat(
    @Param("folder_id") folderId: string,
    @Body() body: { chatId: string; isPin: boolean }
  ) {
    const { chatId, isPin } = body;

    const command = isPin
      ? new PinChatCommand({ folderId, chatId })
      : new UnpinChatCommand({ folderId, chatId });

    await this.commandBus.executeCommand(command);
  }

  @Delete(":folder_id")
  async deleteFolder(@Param("folder_id") folderId: string) {
    const command = new RemoveFolderCommand({ folderId });

    await this.commandBus.executeCommand(command);
  }
}

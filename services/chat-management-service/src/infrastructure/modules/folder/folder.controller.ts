import { Body, Controller, Get, Post } from "@nestjs/common";
import { CreateFolderCommand } from "../../../application/services/folder-service/create-folder";
import { CommandBusService } from "../command-bus/command-bus.service";
import { FolderRequest } from "./interfaces";
import { FolderCache } from "./folder-repo/folder-repo";
import { ArchivePersonalChatCommand } from "../../../application/services/personal-chat-service/archive-personal-chat";

@Controller("folders")
export class FolderController {
  constructor(private commandBus: CommandBusService) {}

  @Get()
  async getAllFolders() {
    return FolderCache;
  }

  @Post("new")
  async createFolder(@Body() reqBody: FolderRequest.CreateFolderBody) {
    const userId = "1";
    const { name } = reqBody;

    const command = new CreateFolderCommand(userId, name);

    const newFolder = await this.commandBus.executeCommand(command);

    console.log("New folder", newFolder);
  }
}

import { Body, Controller, Post } from "@nestjs/common";
import { CommandBus } from "../command-bus/command-bus";
import { CreateFolderCommand } from "../../../application/services/folder-service/create-folder";
import { v4 } from "uuid";

export interface CreateFolderRequestBody {
  name: string;
}
@Controller("folders")
export class FolderController {
  constructor(private commandBus: CommandBus) {}

  @Post("new")
  async createFolder(@Body() body: CreateFolderRequestBody) {
    const { name } = body;

    const command = new CreateFolderCommand(v4(), name);

    await this.commandBus.executeCommand(command);
  }
}

import {
  Body,
  Controller,
  Delete,
  Inject,
  Param,
  Post,
  Put,
} from "@nestjs/common";
import { FolderAppService } from "../../../application/services/folder-service/folder-service";
import { FOLDER_APP_SERVICE } from "./token";

export interface CreateFolderRequestBody {
  name: string;
}
@Controller("folders")
export class FolderController {
  constructor(
    @Inject(FOLDER_APP_SERVICE)
    private folderAppService: FolderAppService
  ) {}

  @Post()
  async createFolder(@Body() body: CreateFolderRequestBody) {
    const { name } = body;

    await this.folderAppService.createFolder({ name });
  }

  @Put(":folder_id/name")
  async renameFolder(
    @Param("folder_id") folderId: string,
    @Body() body: { name: string }
  ) {
    const { name } = body;

    await this.folderAppService.renameFolder({ folderId, name });
  }

  @Post(":folder_id/pin")
  async pinChat(
    @Param("folder_id") folderId: string,
    @Body() body: { chatId: string; isPin: boolean }
  ) {
    const { chatId, isPin } = body;

    if (isPin) await this.folderAppService.pinChat({ folderId, chatId });
    else await this.folderAppService.unpinChat({ folderId, chatId });
  }

  @Delete(":folder_id")
  async deleteFolder(@Param("folder_id") folderId: string) {
    await this.folderAppService.removeFolder({ folderId });
  }
}

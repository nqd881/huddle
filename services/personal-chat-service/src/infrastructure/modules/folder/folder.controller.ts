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
import { CreateFolderCommand } from "../../../application/services/folder-service/create-folder";
import { RenameFolderCommand } from "../../../application/services/folder-service/rename-folder";
import { PinChatCommand } from "../../../application/services/folder-service/pin-chat";
import { UnpinChatCommand } from "../../../application/services/folder-service/unpin-chat";
import { RemoveFolderCommand } from "../../../application/services/folder-service/remove-folder";
import { SetFolderFiltersCommand } from "../../../application/services/folder-service/set-folder-filters";

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

    await this.folderAppService.createFolder(new CreateFolderCommand({ name }));
  }

  @Post(":folder_id/filters")
  async setFolderFilters(
    @Param("folder_id") folderId: string,
    @Body()
    body: {
      includedIds?: string[];
      excludedIds?: string[];
      type?: string;
      muted?: boolean;
      archived?: boolean;
      read?: boolean;
    }
  ) {
    await this.folderAppService.setFolderFilter(
      new SetFolderFiltersCommand({ folderId, ...body })
    );
  }

  @Put(":folder_id/name")
  async renameFolder(
    @Param("folder_id") folderId: string,
    @Body() body: { name: string }
  ) {
    const { name } = body;

    await this.folderAppService.renameFolder(
      new RenameFolderCommand({ folderId, name })
    );
  }

  @Post(":folder_id/pin")
  async pinChat(
    @Param("folder_id") folderId: string,
    @Body() body: { chatId: string; isPin: boolean }
  ) {
    const { chatId, isPin } = body;

    if (isPin)
      await this.folderAppService.pinChat(
        new PinChatCommand({ folderId, chatId })
      );
    else
      await this.folderAppService.unpinChat(
        new UnpinChatCommand({ folderId, chatId })
      );
  }

  @Delete(":folder_id")
  async deleteFolder(@Param("folder_id") folderId: string) {
    await this.folderAppService.removeFolder(
      new RemoveFolderCommand({ folderId })
    );
  }
}

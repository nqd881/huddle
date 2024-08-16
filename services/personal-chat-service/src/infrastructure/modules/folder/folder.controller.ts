import {
  Body,
  Controller,
  Delete,
  Inject,
  Param,
  Post,
  Put,
} from "@nestjs/common";
import { App } from "../../../application/app";
import { PinChatCommand } from "../../../application/use-cases/folder/pin-chat";
import { RemoveFolderCommand } from "../../../application/use-cases/folder/remove-folder";
import { RenameFolderCommand } from "../../../application/use-cases/folder/rename-folder";
import { SetFolderFiltersCommand } from "../../../application/use-cases/folder/set-folder-filters";
import { UnpinChatCommand } from "../../../application/use-cases/folder/unpin-chat";
import { AppCoreToken } from "../app-core";
import { ClsService } from "nestjs-cls";

export interface CreateFolderRequestBody {
  name: string;
}
@Controller("folders")
export class FolderController {
  constructor(
    @Inject(AppCoreToken)
    private appCore: App,
    private clsService: ClsService
  ) {}

  // @Post()
  // async createFolder(@Body() body: CreateFolderRequestBody) {
  //   const { name } = body;

  //   await this.appCore.handleCommand(
  //     new CreateFolderCommand(
  //       { name },
  //       { userId: this.clsService.get("userId") }
  //     )
  //   );
  // }

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
    await this.appCore.handleCommand(
      new SetFolderFiltersCommand(
        { folderId, ...body },
        { userId: this.clsService.get("userId") }
      )
    );
  }

  @Put(":folder_id/name")
  async renameFolder(
    @Param("folder_id") folderId: string,
    @Body() body: { name: string }
  ) {
    const { name } = body;

    await this.appCore.handleCommand(
      new RenameFolderCommand(
        { folderId, name },
        { userId: this.clsService.get("userId") }
      )
    );
  }

  @Post(":folder_id/pin")
  async pinChat(
    @Param("folder_id") folderId: string,
    @Body() body: { chatId: string; isPin: boolean }
  ) {
    const { chatId, isPin } = body;

    if (isPin)
      await this.appCore.handleCommand(
        new PinChatCommand(
          { folderId, chatId },
          { userId: this.clsService.get("userId") }
        )
      );
    else
      await this.appCore.handleCommand(
        new UnpinChatCommand(
          { folderId, chatId },
          { userId: this.clsService.get("userId") }
        )
      );
  }

  @Delete(":folder_id")
  async deleteFolder(@Param("folder_id") folderId: string) {
    await this.appCore.handleCommand(
      new RemoveFolderCommand(
        { folderId },
        { userId: this.clsService.get("userId") }
      )
    );
  }
}

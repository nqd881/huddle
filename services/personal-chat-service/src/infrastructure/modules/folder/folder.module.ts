import { Module } from "@nestjs/common";
import { FolderCommandHandlerProvider } from "./command-handler-provider";
import { FolderEventHandlerProvider } from "./event-handler-provider";
import { FolderController } from "./folder.controller";

@Module({
  controllers: [FolderController],
  providers: [FolderCommandHandlerProvider, FolderEventHandlerProvider],
})
export class FolderModule {}

import { Module } from "@nestjs/common";
import { ICommandHandler } from "../../../application/interfaces";
import { CommandBusModule } from "../command-bus/command-bus.module";
import { FolderCommandHandlersModule } from "./folder-command-handlers/folder-command-handlers.module";
import { FolderController } from "./folder.controller";
import { FOLDER_COMMAND_HANDLERS } from "./folder-command-handlers/token";

@Module({
  imports: [
    CommandBusModule.forRootAsync({
      imports: [FolderCommandHandlersModule],
      useFactory: (handlers: ICommandHandler[]) => {
        return { handlers };
      },
      inject: [FOLDER_COMMAND_HANDLERS],
    }),
  ],
  controllers: [FolderController],
})
export class FolderModule {}

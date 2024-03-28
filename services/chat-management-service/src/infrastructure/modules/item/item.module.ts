import { Module } from "@nestjs/common";
import { ItemCommandHandlerProvider } from "./command-handler.provider";
import { ItemController } from "./item.controller";
import { ItemEventHandlerProvider } from "./event-handler.provider";

@Module({
  imports: [],
  controllers: [ItemController],
  providers: [ItemCommandHandlerProvider, ItemEventHandlerProvider],
  exports: [],
})
export class ItemModule {}

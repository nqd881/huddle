import { Module } from "@nestjs/common";
import { CommandBusModule } from "../command-bus/command-bus.module";
import { PersonalChatCommandHandlersModule } from "./personal-chat-command-handlers/personal-chat-command-handlers.module";
import { PERSONAL_CHAT_COMMAND_HANDLERS } from "./personal-chat-command-handlers/token";
import { ICommandHandler } from "../../../application/interfaces";

@Module({
  imports: [
    CommandBusModule.forRootAsync({
      imports: [PersonalChatCommandHandlersModule],
      useFactory: (handlers: ICommandHandler[]) => {
        return { handlers };
      },
      inject: [PERSONAL_CHAT_COMMAND_HANDLERS],
    }),
  ],
})
export class PersonalChatModule {}

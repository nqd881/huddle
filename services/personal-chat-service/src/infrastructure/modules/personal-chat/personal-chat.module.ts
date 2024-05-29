import { Module } from "@nestjs/common";
import { PersonalChatEventHandlerProvider } from "./event-handler-provider";
import { PersonalChatController } from "./personal-chat.controller";
import { PersonalChatRepoModule } from "./personal-chat-repo/personal-chat-repo.module";
import { PERSONAL_CHAT_APP_SERVICE, PERSONAL_CHAT_REPO } from "./token";
import { PersonalChatRepo } from "./personal-chat-repo/personal-chat-repo";
import { IAppCommandBus } from "../../../application/base/app-command";
import { IPersonalChatRepo } from "../../../domain/repositories/personal-chat.repo";
import { CommandBus } from "../command-bus/command-bus";
import { PersonalChatAppService } from "../../../application/services/personal-chat-service/personal-chat-service";

@Module({
  imports: [PersonalChatRepoModule],
  controllers: [PersonalChatController],
  providers: [
    { provide: PERSONAL_CHAT_REPO, useExisting: PersonalChatRepo },
    {
      provide: PERSONAL_CHAT_APP_SERVICE,
      useFactory: (
        commandBus: IAppCommandBus,
        personalChatRepo: IPersonalChatRepo
      ) => {
        return new PersonalChatAppService(commandBus, personalChatRepo);
      },
      inject: [CommandBus, PERSONAL_CHAT_REPO],
    },
    PersonalChatEventHandlerProvider,
  ],
})
export class PersonalChatModule {}

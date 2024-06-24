import { Module } from "@nestjs/common";
import { IAppCommandBus } from "../../../application/base/app-command";
import { PersonalChatAppService } from "../../../application/use-cases/personal-use-cases/personal-chat-service";
import { IDomainRegistry } from "../../../domain/domain";
import { CommandBus } from "../command-bus/command-bus";
import { DomainRegistry } from "../domain-registry/domain-registry";
import { PersonalChatRepoModule } from "../repositories/personal-chat-repo/personal-chat-repo.module";
import { PersonalChatEventHandlerProvider } from "./event-handler-provider";
import { PersonalChatController } from "./personal-chat.controller";
import { PERSONAL_CHAT_APP_SERVICE } from "./token";

@Module({
  imports: [PersonalChatRepoModule],
  controllers: [PersonalChatController],
  providers: [
    {
      provide: PERSONAL_CHAT_APP_SERVICE,
      useFactory: (
        commandBus: IAppCommandBus,
        domainRegistry: IDomainRegistry
      ) => {
        return new PersonalChatAppService(commandBus, domainRegistry);
      },
      inject: [CommandBus, DomainRegistry],
    },
    PersonalChatEventHandlerProvider,
  ],
})
export class PersonalChatModule {}

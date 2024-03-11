import { Module } from "@nestjs/common";
import { FolderModule } from "../folder/folder.module";
import { PersonalChatModule } from "../personal-chat/personal-chat.module";

@Module({
  imports: [FolderModule, PersonalChatModule],
})
export class AppModule {}

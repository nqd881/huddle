import { Module } from "@nestjs/common";
import { AppCoreModule } from "../app-core/app-core.module";
import { FolderController } from "./folder.controller";

@Module({
  imports: [AppCoreModule],
  controllers: [FolderController],
})
export class FolderModule {}

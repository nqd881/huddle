import { Module } from "@nestjs/common";
import { FolderCreatedEventDeserializer } from "./folder-created.deserializer";

const deserializers = [FolderCreatedEventDeserializer];

@Module({
  providers: [...deserializers],
  exports: [...deserializers],
})
export class FolderEventDeserializerModule {}

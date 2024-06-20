import { Module } from "@nestjs/common";
import { FolderCreatedEventSerializer } from "./folder-created.serializer";

const serializers = [FolderCreatedEventSerializer];

@Module({
  providers: serializers,
  exports: serializers,
})
export class FolderEventSerializersModule {}

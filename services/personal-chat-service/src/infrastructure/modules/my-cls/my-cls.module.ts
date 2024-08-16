import { Module } from "@nestjs/common";
import { ClsModule, ClsService } from "nestjs-cls";
import { v4 } from "uuid";

@Module({
  imports: [
    ClsModule.forRoot({
      middleware: {
        mount: true,
        setup: (clsService: ClsService) => {
          clsService.set("userId", v4());
        },
      },
      global: true,
    }),
  ],
})
export class MyClsModule {}

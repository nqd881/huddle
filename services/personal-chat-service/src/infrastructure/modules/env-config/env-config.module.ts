import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";

const envFilePath = (featureName?: string) => {
  return `src/infrastructure/env/${process.env.NODE_ENV}/${
    featureName ? `.${featureName}` : ""
  }.env`;
};

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: [envFilePath("database")],
    }),
  ],
})
export class EnvConfigModule {}

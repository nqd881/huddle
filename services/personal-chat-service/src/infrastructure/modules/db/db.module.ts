import { Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { SequelizeModule, SequelizeModuleOptions } from "@nestjs/sequelize";
import { EnvName } from "../../env/env.name";
import { DbService } from "./db.service";
import { ClsModule } from "nestjs-cls";

type DbModuleOptions = SequelizeModuleOptions;

@Module({
  imports: [ConfigModule, ClsModule],
  providers: [DbService],
  exports: [DbService],
})
export class DbModule {
  static forRoot(options?: DbModuleOptions) {
    return {
      module: DbModule,
      imports: [
        SequelizeModule.forRootAsync({
          imports: [DbModule, ConfigModule],
          useFactory: async (
            dbService: DbService,
            configService: ConfigService
          ) => {
            const _options: DbModuleOptions = {
              dialect: configService.get(EnvName.DB_DIALECT),
              host: configService.get(EnvName.DB_HOST),
              port: configService.get(EnvName.DB_PORT),
              username: configService.get(EnvName.DB_USERNAME),
              password: configService.get(EnvName.DB_PASSWORD),
              database: configService.get(EnvName.DB_NAME),
              pool: {
                max: parseInt(configService.get(EnvName.DB_POOL_MAX) || "1"),
                min: parseInt(configService.get(EnvName.DB_POOL_MIN) || "1"),
              },
              autoLoadModels: true,
              synchronize: true,
              ...options,
            };

            _options.database = _options.database ?? "test";

            await dbService.createDatabaseIfNotExist(_options.database);

            return _options;
          },
          inject: [DbService, ConfigService],
        }),
      ],
    };
  }
}

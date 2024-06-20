import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { Client } from "pg";
import { EnvName } from "../../env/env.name";
import { ClsService } from "nestjs-cls";
import { MyClsStore } from "../app/my-cls-store";
import { Transaction } from "sequelize";

@Injectable()
export class DbService {
  constructor(
    private configService: ConfigService,
    private clsService: ClsService<MyClsStore>
  ) {}

  async connect() {
    const client = new Client({
      user: this.configService.get(EnvName.DB_USERNAME),
      password: this.configService.get(EnvName.DB_PASSWORD),
      host: this.configService.get(EnvName.DB_HOST),
      port: this.configService.get(EnvName.DB_PORT),
    });

    await client.connect();

    return client;
  }

  async createDatabaseIfNotExist(dbName: string) {
    const client = await this.connect();

    const dbExistsRes = await client.query(
      "SELECT FROM pg_database WHERE datname=$1",
      [dbName]
    );
    const dbExists = dbExistsRes.rowCount !== 0;

    if (!dbExists) {
      await client.query(`CREATE DATABASE ${dbName}`);
    }

    client.end();
  }

  async dropDatabase(dbName: string) {
    const client = await this.connect();

    await client.query(`DROP DATABASE IF EXISTS ${dbName}`);

    client.end();
  }

  currentTransaction() {
    return this.clsService.get("transaction");
  }

  setCurrentTransaction(transaction: Transaction) {
    return this.clsService.set("transaction", transaction);
  }
}

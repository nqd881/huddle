import { DynamicModule, Module, OnModuleInit } from "@nestjs/common";
import { KafkaConnectService } from "./kafka-connect.service";
import { KAFKA_CONNECT_URL } from "./token";

export interface DebeziumOptions {
  kafkaConnectUrl: string;
}

export interface DebeziumModuleOptions extends DebeziumOptions {
  global?: boolean;
}

@Module({
  imports: [],
  providers: [KafkaConnectService],
})
export class DebeziumModule implements OnModuleInit {
  constructor(private kafkaConnectService: KafkaConnectService) {}

  async onModuleInit() {
    //  TODO:
    // get last config of connector from database
    // if has diff between current connector config and last config in db,
    // check if connector has already exist in kafka-connect, delete and recreate, if not, create new connector

    const connectors = await this.kafkaConnectService.getConnectors();

    const connectorConfig = {
      name: "personal_chat_service_domain_event_connector",
      config: {
        "connector.class": "io.debezium.connector.postgresql.PostgresConnector",
        "key.converter": "org.apache.kafka.connect.json.JsonConverter",
        "key.converter.schemas.enable": "false",
        "value.converter": "org.apache.kafka.connect.json.JsonConverter",
        "value.converter.schemas.enable": "false",
        "database.hostname": "postgres-service",
        "database.port": "5432",
        "database.user": "postgres",
        "database.password": "secret",
        "database.dbname": "postgres",
        "topic.prefix": "test",
        "table.include.list": "public.domain_events",
      },
    };

    if (connectors.includes(connectorConfig.name)) {
      await this.kafkaConnectService.deleteConnector(connectorConfig.name);

      // return;
    }

    await this.kafkaConnectService.createConnector(connectorConfig);
  }

  static forRoot(options: DebeziumModuleOptions): DynamicModule {
    return {
      module: DebeziumModule,
      providers: [
        { provide: KAFKA_CONNECT_URL, useValue: options.kafkaConnectUrl },
      ],
    };
  }
}

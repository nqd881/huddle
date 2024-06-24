import { createModuleProviderTokenBuilder } from "../../utils/provider-token";

export const DEBEZIUM_MODULE_NAME = "Debezium";

const DebeziumModuleProviderToken =
  createModuleProviderTokenBuilder(DEBEZIUM_MODULE_NAME);

export const KAFKA_CONNECT_URL = DebeziumModuleProviderToken("KafkaConnectURL");

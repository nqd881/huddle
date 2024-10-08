import { Inject, Injectable } from "@nestjs/common";
import axios, { AxiosInstance } from "axios";
import { KAFKA_CONNECT_URL } from "./token";

export interface KafkaConnectOptions {
  protocol?: "http" | "https";
  host?: string;
  port?: string;
  url?: string;
}

@Injectable()
export class KafkaConnectService {
  private kafkaConnectAxios: AxiosInstance;

  constructor(@Inject(KAFKA_CONNECT_URL) private kafkaConnectUrl: string) {
    this.kafkaConnectAxios = axios.create({
      baseURL: this.kafkaConnectUrl,
    });
  }

  async getConnectors() {
    const result = await this.kafkaConnectAxios.get<string[]>("connectors");

    return result.data;
  }

  async createConnector(config: object) {
    await this.kafkaConnectAxios.post("connectors", config);
  }

  async deleteConnector(connectorName: string) {
    await this.kafkaConnectAxios.delete(`connectors/${connectorName}`);
  }

  async getConnector(connectorName: string) {
    const result = await this.kafkaConnectAxios.get(
      `connectors/${connectorName}`
    );

    return result.data;
  }
}

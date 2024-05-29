import { v4 } from "uuid";
import { Type } from "../utils/type";

export interface IAppCommandMetadata {
  readonly id: string;
  userId?: string;
  timestamp?: number;
  correlationId?: string;
  causationId?: string;
}

export interface IAppCommandBase<P extends object = {}>
  extends IAppCommandMetadata {
  payload: P;
}

export type AppCommandPayload<T extends IAppCommandBase> =
  T extends IAppCommandBase<infer P> ? P : never;

export interface IAppCommandHandler<
  T extends IAppCommandBase = IAppCommandBase
> {
  commandType(): Type<T>;

  handleCommand(command: T): Promise<void>;
}

export class AppCommandBase<P extends object = {}>
  implements IAppCommandBase<P>
{
  public readonly metadata: IAppCommandMetadata;
  public readonly payload: P;

  constructor(payload: P, metadata: Partial<IAppCommandMetadata> = {}) {
    this.metadata = {
      id: v4(),
      timestamp: Date.now(),
      ...metadata,
    };
    this.payload = payload;
  }

  setMetadata(metadata: Omit<IAppCommandMetadata, "id">) {
    Object.keys(metadata).forEach((metadataKey) => {
      if (!this.metadata[metadataKey])
        this.metadata[metadataKey] = metadata[metadataKey];
    });
  }

  get id() {
    return this.metadata.id;
  }

  get userId() {
    return this.metadata.userId;
  }

  get timestamp() {
    return this.metadata.timestamp;
  }

  get correlationId() {
    return this.metadata.correlationId;
  }

  get causationId() {
    return this.metadata.causationId;
  }
}

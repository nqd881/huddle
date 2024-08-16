import { Inject, Injectable } from "@nestjs/common";
import {
  AnyCommand,
  AnyEntity,
  AnyEvent,
  AnyEventSourcedAggregate,
  AnyMessage,
  AnyModel,
  AnyStateAggregate,
  CommandBase,
  CommandBuilder,
  Domain,
  EntityBase,
  EntityBuilder,
  EnumBase,
  EnumBuilder,
  EventBase,
  EventBuilder,
  EventSourcedAggregateBase,
  EventSourcedAggregateBuilder,
  MessageBase,
  MessageBuilder,
  ModelBase,
  PropsOf,
  StateAggregateBase,
  StateAggregateBuilder,
  ValueObjectBase,
  ValueObjectBuilder,
} from "ddd-node";
import { DOMAIN } from "./token";
import { SerializedModel, SerializedModelProps } from "./types";

@Injectable()
export class DomainModelSerdesService {
  constructor(@Inject(DOMAIN) private domain: Domain) {}

  serializeValue(value: any) {
    if (ModelBase.isModel(value)) return this.serializeModel(value);

    return value;
  }

  serializeModelProps<T extends AnyModel>(model: T): SerializedModelProps<T> {
    let result: any = {};

    const modelProps = model.props();

    if (!modelProps) throw new Error();

    for (let [key, value] of Object.entries(modelProps)) {
      if (Array.isArray(value)) {
        result[key] = value.map((_value) => this.serializeValue(_value));

        continue;
      }

      result[key] = this.serializeValue(value);
    }

    return result;
  }

  serializeModel<T extends AnyModel>(model: T): SerializedModel<T> {
    const { modelId, modelName, modelVersion } = model.modelDescriptor();

    if (!this.domain.modelRegistry.hasRegisteredModel(modelName, modelVersion))
      throw new Error();

    const serializedMetadata = model.metadata as ReturnType<T["metadata"]>;
    const serializedProps = this.serializeModelProps<T>(model);

    return {
      modelId,
      modelName,
      modelVersion,
      metadata: serializedMetadata,
      props: serializedProps,
    };
  }

  isSerializedModel(obj: any): obj is SerializedModel<AnyModel> {
    return obj?.modelId;
  }

  deserializeValue(value: any) {
    if (this.isSerializedModel(value)) return this.deserializeModel(value);

    return value;
  }

  deserializeModelProps<T extends AnyModel>(
    serializedModel: SerializedModel<T>
  ): PropsOf<T> {
    let result: any = {};

    const modelProps = serializedModel.props;

    for (let [key, value] of Object.entries(modelProps)) {
      if (Array.isArray(value)) {
        result[key] = value.map((_value) => this.deserializeValue(_value));

        continue;
      }

      result[key] = this.deserializeValue(value);
    }

    return result;
  }

  deserializeModel<T extends AnyModel = AnyModel>(
    serializedModel: SerializedModel<T>
  ): T {
    const { modelId, modelName, modelVersion } = serializedModel;

    const modelClass = this.domain.modelRegistry.getModel(
      modelName,
      modelVersion
    );

    if (!modelClass)
      throw new Error(`Cannot deserialize model for model with id ${modelId}`);

    const deserializedProps = this.deserializeModelProps(serializedModel);

    switch (true) {
      case modelClass.prototype instanceof EnumBase: {
        const builder = new EnumBuilder(modelClass as any);

        return builder.withValue(deserializedProps.value).build() as any as T;
      }
      case modelClass.prototype instanceof ValueObjectBase: {
        const builder = new ValueObjectBuilder(modelClass as any);

        return builder.withProps(deserializedProps).build() as unknown as T;
      }
      case modelClass.prototype instanceof EventBase: {
        const builder = new EventBuilder(modelClass as any);

        const serializedEvent = serializedModel as SerializedModel<AnyEvent>;

        const { id, timestamp, context, source } = serializedEvent.metadata;

        return builder
          .withId(id)
          .withTimestamp(timestamp)
          .withContext(context as any)
          .withSource(source)
          .withProps(deserializedProps)
          .build() as unknown as T;
      }
      case modelClass.prototype instanceof CommandBase: {
        const builder = new CommandBuilder(modelClass as any);

        const serializedCommand =
          serializedModel as SerializedModel<AnyCommand>;

        const { id, timestamp, context } = serializedCommand.metadata;

        return builder
          .withId(id)
          .withTimestamp(timestamp)
          .withContext(context as any)
          .withProps(deserializedProps)
          .build() as unknown as T;
      }
      case modelClass.prototype instanceof MessageBase: {
        const builder = new MessageBuilder(modelClass as any);

        const serializedMessage =
          serializedModel as SerializedModel<AnyMessage>;

        const { id, timestamp, context } = serializedMessage.metadata;

        return builder
          .withId(id)
          .withTimestamp(timestamp)
          .withContext(context as any)
          .withProps(deserializedProps)
          .build() as unknown as T;
      }
      case modelClass.prototype instanceof StateAggregateBase: {
        const builder = new StateAggregateBuilder(modelClass as any);

        const serializedAggregate =
          serializedModel as SerializedModel<AnyStateAggregate>;

        const { id, version } = serializedAggregate.metadata;

        return builder
          .withId(id)
          .withVersion(version)
          .withProps(deserializedProps)
          .build() as unknown as T;
      }
      case modelClass.prototype instanceof EventSourcedAggregateBase: {
        const builder = new EventSourcedAggregateBuilder(modelClass as any);

        const serializedAggregate =
          serializedModel as SerializedModel<AnyEventSourcedAggregate>;

        const { id, version } = serializedAggregate.metadata;

        return builder
          .withId(id)
          .withVersion(version)
          .withProps(deserializedProps)
          .build() as unknown as T;
      }
      case modelClass.prototype instanceof EntityBase: {
        const builder = new EntityBuilder(modelClass as any);

        const serializedEntity = serializedModel as SerializedModel<AnyEntity>;

        const { id } = serializedEntity.metadata;

        return builder
          .withId(id)
          .withProps(deserializedProps)
          .build() as unknown as T;
      }
      default: {
        throw new Error("Invalid model");
      }
    }
  }
}

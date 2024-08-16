import { AnyModel, PropsOf } from "ddd-node";

export type SerializedModel<T extends AnyModel> = {
  modelId: string;
  modelName: string;
  modelVersion: number;
  metadata: ReturnType<T["metadata"]>;
  props: SerializedModelProps<T>;
};

export type SerializedModelProps<T extends AnyModel> = {
  [K in keyof PropsOf<T>]: SerializedValue<PropsOf<T>[K]>;
};

export type SerializedValue<T = any> = T extends AnyModel
  ? SerializedModel<T>
  : T extends AnyModel[]
  ? SerializedModel<T[number]>
  : T;

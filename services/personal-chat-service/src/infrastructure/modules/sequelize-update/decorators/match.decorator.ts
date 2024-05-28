import { Model, ModelCtor } from "sequelize-typescript";
import { MatchMetaKey } from "../sequelize-model-matching.service";
import { ModelAttributes } from "sequelize";

export const Match = <T extends Model>(
  fields: (keyof ModelAttributes<T>)[]
) => {
  return (target: ModelCtor<T>) => {
    Reflect.defineMetadata(MatchMetaKey, fields, target);
  };
};

import { Model, ModelCtor } from "sequelize-typescript";

export type IdentifyFn<T> = (x: T, y: T) => boolean;

const IdentifierMetaKey = Symbol.for("IDENTIFIER");

export const Identifier = <T extends Model>(fields: (keyof T)[]) => {
  return (target: ModelCtor<T>) => {
    Reflect.defineMetadata(IdentifierMetaKey, fields, target);
  };
};

export const getIdentifier = <T extends Model = Model>(
  target: ModelCtor<T>
): IdentifyFn<T> => {
  const fields: string[] = Reflect.getMetadata(IdentifierMetaKey, target) || [];

  if (!fields.length) {
    const primaryKeys = target.primaryKeyAttributes;

    return (x, y) => {
      return !primaryKeys.some((pk) => {
        if (!x[pk] || !y[pk]) return false;

        return x[pk] !== y[pk];
      });
    };
  }

  return (x, y) => {
    return !fields.some((field) => x[field] !== y[field]);
  };
};

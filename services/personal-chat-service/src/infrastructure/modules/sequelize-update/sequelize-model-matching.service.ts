import { Injectable } from "@nestjs/common";
import { Model, ModelCtor } from "sequelize-typescript";

export const MatchMetaKey = Symbol.for("Match");

export type Matcher<T extends Model> = (x: T, y: T) => boolean;

@Injectable()
export class SequelizeModelMatchingService {
  getMatcher<T extends Model = Model>(target: ModelCtor<T>): Matcher<T> {
    const matchFields: string[] =
      Reflect.getMetadata(MatchMetaKey, target) || [];

    if (!matchFields.length) {
      const primaryKeys = target.primaryKeyAttributes;

      return (x, y) => {
        return !primaryKeys.some((pk) => {
          if (!x[pk] || !y[pk]) return false;

          return x[pk] !== y[pk];
        });
      };
    }

    return (x, y) => {
      return !matchFields.some((matchField) => x[matchField] !== y[matchField]);
    };
  }
}

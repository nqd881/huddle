import { Injectable } from "@nestjs/common";
import { Transaction } from "sequelize";
import { Model, ModelCtor } from "sequelize-typescript";
import {
  Matcher,
  SequelizeModelMatchingService,
} from "./sequelize-model-matching.service";

export type Update = (transaction?: Transaction) => Promise<any>;

export type Pair<T> = {
  s?: T;
  t?: T;
};

@Injectable()
export class SequelizeUpdateService {
  constructor(private modelMatchingService: SequelizeModelMatchingService) {}

  update<T extends Model>(updates: Update[], source: T, target?: T | null) {
    if (target) {
      const modelType = source.constructor as ModelCtor<T>;

      const attributes = modelType.getAttributes();

      Object.keys(attributes).forEach((attribute) => {
        source[attribute] = target[attribute];
      });

      const associations = modelType.associations;

      Object.entries(associations).forEach(([key, association]) => {
        const s = source[key];
        const t = target[key];

        if (association.isMultiAssociation) {
          const { target: targetType } = association;

          const matcher = this.modelMatchingService.getMatcher(
            targetType as ModelCtor
          );

          const arrSource = () => (Array.isArray(s) ? s : []);
          const arrTarget = () => (Array.isArray(t) ? t : []);

          this.updateArray(updates, arrSource(), arrTarget(), matcher);
        } else {
          this.updatePair(updates, { s, t });
        }
      });
    }

    updates.push((transaction) => source.save({ transaction }));

    return updates;
  }

  updatePair<T extends Model>(updates: Update[], pair: Pair<T>) {
    const { s, t } = pair;

    if (s && t) {
      this.update(updates, s, t);
    } else if (!s && t) {
      updates.push((transaction) => t.save({ transaction }));
    } else if (!t && s) {
      updates.push((transaction) => s.destroy({ transaction }));
    }

    return updates;
  }

  updateArray<T extends Model>(
    updates: Update[],
    source: T[],
    target: T[],
    matcher: Matcher<T>
  ) {
    const pairs = this.buildPairs(source, target, matcher);

    pairs.forEach((pair) => this.updatePair(updates, pair));

    return updates;
  }

  buildPairs<T extends Model>(
    source: T[],
    target: T[],
    matcher: Matcher<T>
  ): Pair<T>[] {
    const targetTracking = Array(target.length).fill(true);
    const result: Pair<T>[] = [];

    source.forEach((s) => {
      const tIndex = target.findIndex((_t) => {
        if (!_t) return false;

        return matcher(s, _t);
      });

      const t = target[tIndex];

      result.push({ s, t });

      if (t) targetTracking[tIndex] = false;
    });

    target.forEach((t, index) => {
      if (targetTracking[index]) {
        result.push({ t });
      }
    });

    return result;
  }
}

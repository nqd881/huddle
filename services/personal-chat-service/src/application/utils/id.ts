import { Id } from "ddd-node";
import { toArray } from "lodash";

export function toIds(ids: string[]): Id[];
export function toIds(...ids: string[]): Id[];
export function toIds(ids: string | string[], ...otherIds: string[]): Id[] {
  const values = [...toArray(ids), ...otherIds];

  return values.map((value) => new Id(value));
}

export function toIdValues(ids: Id[]): string[] {
  return ids.map((id) => id.value);
}

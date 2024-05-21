import { Id } from "ddd-node";

export const toIds = (...ids: string[]) => {
  return ids.map((id) => new Id(id));
};

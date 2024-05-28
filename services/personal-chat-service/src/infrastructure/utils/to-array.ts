import { AllowArray } from "./types";

export const toArray = <T>(value: AllowArray<T>) => {
  if (Array.isArray(value)) return value;

  return [value];
};

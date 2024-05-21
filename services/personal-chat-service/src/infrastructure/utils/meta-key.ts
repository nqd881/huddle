export const metaKey = (key: string) => {
  return Symbol.for(`MetaKey.${key}`);
};

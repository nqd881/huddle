export const providerToken = (...token: string[]) => {
  return Symbol.for(`ProviderToken.${token.join(".")}`);
};

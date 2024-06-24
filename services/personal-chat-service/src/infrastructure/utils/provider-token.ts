export const providerToken = (...token: string[]) => {
  return Symbol.for(`${["ProviderToken", ...token].join(".")}`);
};

export const moduleProviderToken = (
  moduleName: string,
  ...tokens: [string, ...string[]]
) => {
  const joinedToken = tokens.join(".");

  return Symbol.for(`${moduleName}|${joinedToken}`);
};

export const createModuleProviderTokenBuilder = (moduleName: string) => {
  return (...tokens: [string, ...string[]]) =>
    moduleProviderToken(moduleName, ...tokens);
};

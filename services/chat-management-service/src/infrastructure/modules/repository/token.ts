import { providerToken } from "../../utils/provider-token";

const repositoryProviderToken = (token: string) => providerToken("repo", token);

export const Repository = {
  Folder: repositoryProviderToken("folder"),
  PersonalChat: repositoryProviderToken("personal_chat"),
  Item: repositoryProviderToken("item"),
} as const;

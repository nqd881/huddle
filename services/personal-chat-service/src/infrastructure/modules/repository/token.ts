import { providerToken } from "../../utils/provider-token";

const repositoryProviderToken = (token: string) =>
  providerToken("repository", token);

export const Repository = {
  Folder: repositoryProviderToken("folder"),
  PersonalChat: repositoryProviderToken("personal_chat"),
} as const;

import { createModuleProviderTokenBuilder } from "../../utils/provider-token";

export const DOMAIN_EVENT_REGISTRY_MODULE_NAME = "DomainEventRegistry";

const DomainEventRegistryProviderToken = createModuleProviderTokenBuilder(
  DOMAIN_EVENT_REGISTRY_MODULE_NAME
);

export const DOMAIN_EVENT_SUBSCRIBER_REGISTRY_OPTIONS =
  DomainEventRegistryProviderToken("Options");

export const DOMAIN_EVENT_SUBSCRIBERS = DomainEventRegistryProviderToken(
  "Options",
  "Subscribers"
);

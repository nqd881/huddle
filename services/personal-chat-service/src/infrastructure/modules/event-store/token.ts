import { createModuleProviderTokenBuilder } from "../../utils/provider-token";

export const EVENT_STORE_MODULE_NAME = "EventStore";

const EventStoreProviderToken = createModuleProviderTokenBuilder(
  EVENT_STORE_MODULE_NAME
);

export const EVENT_STORE_SESSION = EventStoreProviderToken(
  "Options",
  "Session"
);

export const EVENT_SERIALIZER = EventStoreProviderToken(
  "Options",
  "Serializer"
);

export const EVENT_DESERIALIZER = EventStoreProviderToken(
  "Options",
  "Deserializer"
);

export const EVENT_STORE_OPTIONS = EventStoreProviderToken("Options");

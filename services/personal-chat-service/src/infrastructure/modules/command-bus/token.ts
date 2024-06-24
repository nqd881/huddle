import { createModuleProviderTokenBuilder } from "../../utils/provider-token";

export const COMMAND_BUS_MODULE_NAME = "CommandBus";

const CommandBusProviderToken = createModuleProviderTokenBuilder(
  COMMAND_BUS_MODULE_NAME
);

export const COMMAND_BUS_OPTIONS = CommandBusProviderToken("Options");

export const COMMAND_BUS_HOOKS = CommandBusProviderToken("Hooks");

export const COMMAND_HANDLERS = CommandBusProviderToken("CommandHandlers");

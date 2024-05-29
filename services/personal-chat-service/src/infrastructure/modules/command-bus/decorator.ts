import { Type } from "@nestjs/common";
import { metaKey } from "../../utils/meta-key";
import { IAppCommandHandlerProvider } from "./interface";

export const CommandHandlerProviderMetaKey = metaKey("CommandHandlerProvider");

export const AppCommandHandlerProvider = (
  target: Type<IAppCommandHandlerProvider>
) => {
  Reflect.defineMetadata(CommandHandlerProviderMetaKey, true, target);
};

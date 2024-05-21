import { Type } from "@nestjs/common";
import { metaKey } from "../../utils/meta-key";
import { ICommandHandlerProvider } from "./interface";

export const CommandHandlerProviderMetaKey = metaKey("CommandHandlerProvider");

export const CommandHandlerProvider = (
  target: Type<ICommandHandlerProvider>
) => {
  Reflect.defineMetadata(CommandHandlerProviderMetaKey, true, target);
};

import { Type } from "@nestjs/common";
import { metaKey } from "../../utils/meta-key";
import { IEventHandlerProvider } from "./interface";

export const EventHandlerProviderMetaKey = metaKey("EventHandlerProvider");

export const EventHandlerProvider = (target: Type<IEventHandlerProvider>) => {
  Reflect.defineMetadata(EventHandlerProviderMetaKey, true, target);
};

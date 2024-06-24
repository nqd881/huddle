import { Type } from "@nestjs/common";
import { IDomainEventSubscriberProvider } from "./interface";
import { metaKey } from "../../utils/meta-key";

export const DomainEventSubscriberProviderMetaKey = metaKey(
  "DomainEventSubscriberProvider"
);

export const DomainEventSubscriberProvider = (
  target: Type<IDomainEventSubscriberProvider>
) => {
  Reflect.defineMetadata(DomainEventSubscriberProviderMetaKey, true, target);
};

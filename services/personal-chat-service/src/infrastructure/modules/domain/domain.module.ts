import { DynamicModule, Module } from "@nestjs/common";
import { DOMAIN, DOMAIN_NAME } from "./token";
import { domainManager } from "ddd-node";

@Module({
  providers: [
    {
      provide: DOMAIN,
      useFactory: (domainName?: string) => {
        if (!domainName) return domainManager.getDomain();

        return domainManager.getDomain(domainName);
      },
      inject: [DOMAIN_NAME],
    },
  ],
  exports: [DOMAIN],
})
export class DomainModule {
  static forRoot(domainName?: string): DynamicModule {
    return {
      module: DomainModule,
      providers: [
        {
          provide: DOMAIN_NAME,
          useValue: domainName,
        },
      ],
    };
  }
}

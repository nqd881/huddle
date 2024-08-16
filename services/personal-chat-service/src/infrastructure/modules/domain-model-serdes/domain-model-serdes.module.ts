import { DynamicModule, Module, ModuleMetadata } from "@nestjs/common";
import { DomainModelSerdesService } from "./domain-model-serdes.service";
import { Domain } from "ddd-node";
import { DOMAIN } from "./token";

export interface DomainModelSerdesModuleOptions {
  domain: Domain;
  global?: boolean;
}

export interface DomainModelSerdesModuleAsyncOptions
  extends Pick<ModuleMetadata, "imports"> {
  useFactory: (...args: any[]) => Domain;
  inject?: any[];
  global?: boolean;
}

@Module({
  providers: [DomainModelSerdesService],
  exports: [DomainModelSerdesService],
})
export class DomainModelSerdesModule {
  static forRoot(options: DomainModelSerdesModuleOptions): DynamicModule {
    return {
      module: DomainModelSerdesModule,
      providers: [
        {
          provide: DOMAIN,
          useValue: options.domain,
        },
      ],
      global: options.global,
    };
  }

  static forRootAsync(options: DomainModelSerdesModuleAsyncOptions) {
    return {
      module: DomainModelSerdesModule,
      imports: options?.imports,
      providers: [
        {
          provide: DOMAIN,
          useFactory: options.useFactory,
          inject: options.inject,
        },
      ],
      global: options.global,
    };
  }
}

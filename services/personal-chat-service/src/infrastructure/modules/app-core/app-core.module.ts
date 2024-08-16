import { Module } from "@nestjs/common";
import { App } from "../../../application/app";
import { RepoRegistry } from "../repo-registry/repo-registry";
import { RepoRegistryModule } from "../repo-registry/repo-registry.module";
import { IRepoRegistry } from "../../../application/output-ports/repo-registry";
import { AppCoreToken } from "./token";

@Module({
  imports: [RepoRegistryModule],
  providers: [
    {
      provide: AppCoreToken,
      useFactory: (repoRegistry: IRepoRegistry) => {
        const app = new App(repoRegistry);

        return app;
      },
      inject: [RepoRegistry],
    },
  ],
  exports: [AppCoreToken],
})
export class AppCoreModule {}

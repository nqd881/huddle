import { Container } from "inversify";
import { IDomainRegistry } from "../domain/domain";
import { IAppCommandBus } from "./base/app-command";

export class App extends Container {
  constructor() {
    super();
  }
}

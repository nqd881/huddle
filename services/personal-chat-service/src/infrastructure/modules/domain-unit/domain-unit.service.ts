import { Injectable } from "@nestjs/common";
import { ClsService } from "nestjs-cls";
import { DomainUnit } from "./domain-unit";

export class DomainUnitMap extends Map<string, DomainUnit> {}

@Injectable()
export class DomainUnitService {
  private static DOMAIN_UNIT_MAP = Symbol.for("DOMAIN_UNIT_MAP");

  constructor(private clsService: ClsService) {}

  getDomainUnitMap(): DomainUnitMap {
    return (
      this.clsService.get(DomainUnitService.DOMAIN_UNIT_MAP) ||
      new DomainUnitMap()
    );
  }

  getDomainUnit<T = any, U = any>(id: string): DomainUnit<T, U> | undefined {
    return this.getDomainUnitMap().get(id);
  }

  setDomainUnit(domainUnit: DomainUnit) {
    domainUnit.checkIsLoaded();

    const map = this.getDomainUnitMap();

    map.set(domainUnit.getId(), domainUnit);

    this.clsService.set(DomainUnitService.DOMAIN_UNIT_MAP, map);
  }
}

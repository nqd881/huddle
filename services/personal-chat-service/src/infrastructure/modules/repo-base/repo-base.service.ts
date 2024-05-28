import { Injectable } from "@nestjs/common";
import { ClsService } from "nestjs-cls";
import { Transaction } from "sequelize";
import { Model, Sequelize } from "sequelize-typescript";
import { EventBus } from "../event-bus/event-bus";
import { EventPublisher } from "../event-bus/event-publisher";
import { IMapper } from "../../interface/mapper";
import { AnyAggregate } from "ddd-node";
import {
  SequelizeUpdateService,
  Update,
} from "../sequelize-update/sequelize-update.service";
import { DomainUnitService } from "../domain-unit/domain-unit.service";
import { DomainUnit } from "../domain-unit/domain-unit";

type DomainModel = AnyAggregate;
type PersistenceModel = Model;

@Injectable()
export class RepoBaseService {
  constructor(
    private sequelize: Sequelize,
    private clsService: ClsService,
    private eventBus: EventBus,
    private updateService: SequelizeUpdateService,
    private domainUnitService: DomainUnitService
  ) {}

  eventPublisher() {
    return new EventPublisher(this.eventBus);
  }

  async transaction(callback: (transaction: Transaction) => Promise<any>) {
    let transaction = this.clsService.get("TRANSACTION") as Transaction | null;

    if (!transaction) {
      transaction = await this.sequelize.transaction();

      this.clsService.set("TRANSACTION", transaction);

      try {
        const result = await callback(transaction);

        await transaction.commit();

        return result;
      } catch (err) {
        console.log(err);

        await transaction.rollback();
      }
    } else {
      await callback(transaction);
    }
  }

  async findOne<T extends DomainModel, U extends PersistenceModel>(
    findingFn: () => Promise<U | null>,
    mapper: IMapper<T, U>
  ) {
    const result = await findingFn();

    if (!result) return result;

    const domainUnit = new DomainUnit(mapper).loadPersistenceModel(
      result.id,
      result
    );

    this.domainUnitService.setDomainUnit(domainUnit);

    return domainUnit.getDomainModel();
  }

  async findMany<T extends DomainModel, U extends PersistenceModel>(
    findingFn: () => Promise<(U | null)[]>,
    mapper: IMapper<T, U>
  ) {
    const result = await findingFn();

    if (!result) return result;

    const domainUnits = result.map((persistenceModel) => {
      if (!persistenceModel) return null;

      const domainUnit = new DomainUnit(mapper).loadPersistenceModel(
        persistenceModel.id,
        persistenceModel
      );

      if (domainUnit) this.domainUnitService.setDomainUnit(domainUnit);

      return domainUnit;
    });

    return domainUnits.map(
      (domainUnit) => domainUnit?.getDomainModel() ?? null
    );
  }

  async save<T extends DomainModel, U extends PersistenceModel>(
    instance: T,
    mapper: IMapper<T, U>
  ) {
    return this.transaction(async (transaction) => {
      await this.eventPublisher().publishAll(instance.getEvents());

      const id = instance.id().value;

      const domainUnit =
        this.domainUnitService.getDomainUnit<T, U>(id) ??
        new DomainUnit(mapper).loadDomainModel(id, instance);

      const updates: Update[] = [];

      domainUnit.updatePersistenceModel(
        (oldPersistenceModel, newPersistenceModel) => {
          this.updateService.update(
            updates,
            oldPersistenceModel,
            newPersistenceModel
          );
        }
      );

      await Promise.all(updates.map((u) => u(transaction)));

      return domainUnit.getPersistenceModel();
    });
  }
}

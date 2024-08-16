import { Injectable } from "@nestjs/common";
import { AnyEvent, AnyStateAggregate, IEventDispatcher } from "ddd-node";
import { Transaction } from "sequelize";
import { Model, Sequelize } from "sequelize-typescript";
import { IMapper } from "../../interface/mapper";
import { DbService } from "../db/db.service";
import { DomainUnit } from "../domain-unit/domain-unit";
import { DomainUnitService } from "../domain-unit/domain-unit.service";
import { EventStore, IEventStore } from "../event-store";
import {
  SequelizeUpdateService,
  Update,
} from "../sequelize-update/sequelize-update.service";

type DomainModel = AnyStateAggregate;
type PersistenceModel = Model;

export class EventStoreDispatcher implements IEventDispatcher {
  constructor(private eventStore: IEventStore) {}

  dispatch(event: AnyEvent): void {
    this.eventStore.append(event);
  }
}

@Injectable()
export class RepoBaseService {
  constructor(
    private sequelize: Sequelize,
    private dbService: DbService,
    private updateService: SequelizeUpdateService,
    private domainUnitService: DomainUnitService,
    private eventStore: EventStore
  ) {}

  eventDispatcher(): IEventDispatcher {
    return new EventStoreDispatcher(this.eventStore);
  }

  async transaction(callback: (transaction: Transaction) => Promise<any>) {
    let transaction = this.dbService.currentTransaction();

    if (!transaction) {
      transaction = await this.sequelize.transaction();

      this.dbService.setCurrentTransaction(transaction);

      try {
        const result = await callback(transaction);

        await transaction.commit();

        return result;
      } catch (err) {
        console.log(err);

        await transaction.rollback();
      } finally {
        this.dbService.clearTransaction();
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
    findingFn: () => Promise<U[]>,
    mapper: IMapper<T, U>
  ) {
    const result = await findingFn();

    const domainUnits = result.map((persistenceModel) => {
      const domainUnit = new DomainUnit(mapper).loadPersistenceModel(
        persistenceModel.id,
        persistenceModel
      );

      if (domainUnit) this.domainUnitService.setDomainUnit(domainUnit);

      return domainUnit;
    });

    return domainUnits.map((domainUnit) => domainUnit.getDomainModel()!);
  }

  async save<T extends DomainModel, U extends PersistenceModel>(
    instance: T,
    mapper: IMapper<T, U>
  ) {
    return this.transaction(async (transaction) => {
      const id = instance.id();

      const domainUnit =
        this.domainUnitService.getDomainUnit<T, U>(id) ??
        this.domainUnitService.setDomainUnit(
          new DomainUnit(mapper).loadDomainModel(id, instance)
        );

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

      instance.dispatchEvents(this.eventDispatcher());

      await this.eventStore.store();

      return domainUnit.getPersistenceModel();
    });
  }
}

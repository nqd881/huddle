import { Injectable } from "@nestjs/common";
import { AnyEvent, AnyStateAggregate, IEventDispatcher } from "ddd-node";
import { Transaction } from "sequelize";
import { Model, Sequelize } from "sequelize-typescript";
import { IMapper } from "../../interface/mapper";
import { DbService } from "../db/db.service";
import { DomainUnit } from "../domain-unit/domain-unit";
import { DomainUnitService } from "../domain-unit/domain-unit.service";
import { DomainEventPublisher } from "../event-bus/domain-event-publisher";
import { EventBus } from "../event-bus/event-bus";
import {
  SequelizeUpdateService,
  Update,
} from "../sequelize-update/sequelize-update.service";
import { EventStore, IEventStore } from "../event-store/event-store";

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
    private eventBus: EventBus,
    private updateService: SequelizeUpdateService,
    private domainUnitService: DomainUnitService,
    private eventStore: EventStore
  ) {}

  // eventPublisher() {
  //   return new DomainEventPublisher(this.eventBus);
  // }

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
      const id = instance.id().value;

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

      // await instance.publishEvents(this.eventPublisher());

      // this.eventStore.append(instance.events()) (event store use a thing is session, that mean session can access to current transaction)
      // Then EventStore will save events into db in same transaction -> Debezium is watching changes from outbox table will publish message to message broker (Kafka)
      // Then have something (??? - maybe call MessageConsumer) will listen kafka topic to receive domain event message
      // Then it will use an domain event publisher to publish that event (after deserialized) to subscribers

      return domainUnit.getPersistenceModel();
    });
  }
}

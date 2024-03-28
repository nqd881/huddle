import { Injectable } from "@nestjs/common";
import { EventBus } from "../../event-bus/event-bus";
import { EventPublisher } from "../../event-bus/event-publisher";
import { IEventPublisher } from "../../event-bus/interface";
import { Transaction } from "sequelize";
import { ClsService } from "nestjs-cls";
import { Sequelize } from "sequelize-typescript";

@Injectable()
export class RepoService {
  private _eventPublisher: IEventPublisher;

  constructor(
    private sequelize: Sequelize,
    private clsService: ClsService,
    eventBus: EventBus
  ) {
    this._eventPublisher = new EventPublisher(eventBus);
  }

  eventPublisher() {
    return this._eventPublisher;
  }

  async transaction(callback: (transaction: Transaction) => Promise<void>) {
    let transaction = this.clsService.get("TRANSACTION") as Transaction | null;

    if (!transaction) {
      transaction = await this.sequelize.transaction();

      this.clsService.set("TRANSACTION", transaction);

      try {
        await callback(transaction);

        await transaction.commit();
      } catch (err) {
        console.log(err);

        await transaction.rollback();
      }
    } else {
      await callback(transaction);
    }
  }
}

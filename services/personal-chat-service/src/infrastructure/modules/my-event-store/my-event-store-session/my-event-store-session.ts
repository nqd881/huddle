import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { DbService } from "../../db/db.service";
import { IEventStoreSession } from "../../event-store";
import { StoredEvent } from "../stored-event";
import { StoredEventModel } from "./stored-event.model";

@Injectable()
export class MyEventStoreSession implements IEventStoreSession<StoredEvent> {
  constructor(
    private dbService: DbService,
    @InjectModel(StoredEventModel)
    private storedEventModel: typeof StoredEventModel
  ) {}

  async save(...storedEvent: StoredEvent[]): Promise<void>;
  async save(storedEvent: StoredEvent[]): Promise<void>;
  async save(
    p1: StoredEvent | StoredEvent[],
    ...p2: StoredEvent[]
  ): Promise<void> {
    const storedEvents = Array.isArray(p1) ? p1 : [p1, ...p2];

    await this.storedEventModel.bulkCreate(storedEvents, {
      transaction: this.dbService.currentTransaction(),
    });
  }
}

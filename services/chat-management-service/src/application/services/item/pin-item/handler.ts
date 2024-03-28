import { Id } from "ddd-node";
import { IItemRepo } from "../../../../domain/repositories/folder-item.repo";
import { ICommandHandler } from "../../../interfaces";
import { Type } from "../../../interfaces/type";
import { PinItemCommand } from "./command";

export class PinItemHandler implements ICommandHandler<PinItemCommand> {
  constructor(private itemRepo: IItemRepo) {}

  commandType(): Type<PinItemCommand> {
    return PinItemCommand;
  }

  async handleCommand(command: PinItemCommand): Promise<any> {
    const itemId = new Id(command.itemId);

    const item = await this.itemRepo.findById(itemId);

    if (!item) throw new Error();

    item.pin();

    return this.itemRepo.save(item);
  }
}

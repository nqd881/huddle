import { Id } from "ddd-node";
import { UnpinItemCommand } from ".";
import { IItemRepo } from "../../../../domain/repositories/folder-item.repo";
import { ICommandHandler } from "../../../interfaces";
import { Type } from "../../../interfaces/type";

export class UnpinItemHandler implements ICommandHandler<UnpinItemCommand> {
  constructor(private itemRepo: IItemRepo) {}

  commandType(): Type<UnpinItemCommand> {
    return UnpinItemCommand;
  }

  async handleCommand(command: UnpinItemCommand): Promise<any> {
    const itemId = new Id(command.itemId);

    const item = await this.itemRepo.findById(itemId);

    if (!item) throw new Error();

    item.unpin();

    return this.itemRepo.save(item);
  }
}

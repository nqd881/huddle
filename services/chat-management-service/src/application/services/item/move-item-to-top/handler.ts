import { Id } from "ddd-node";
import { IItemRepo } from "../../../../domain/repositories/folder-item.repo";
import { ICommandHandler } from "../../../interfaces";
import { Type } from "../../../interfaces/type";
import { MoveItemToTopCommand } from "./command";

export class MoveItemToTopHandler
  implements ICommandHandler<MoveItemToTopCommand>
{
  constructor(private itemRepo: IItemRepo) {}

  commandType(): Type<MoveItemToTopCommand> {
    return MoveItemToTopCommand;
  }

  async handleCommand(command: MoveItemToTopCommand): Promise<any> {
    const itemId = new Id(command.itemId);

    const item = await this.itemRepo.findById(itemId);

    if (!item) throw new Error();

    item.moveToTop();

    return this.itemRepo.save(item);
  }
}

import { Inject } from "@nestjs/common";
import { ICommand, ICommandHandler } from "../../../application/interfaces";
import { MoveItemToTopHandler } from "../../../application/services/item/move-item-to-top";
import { PinItemHandler } from "../../../application/services/item/pin-item";
import { UnpinItemHandler } from "../../../application/services/item/unpin-item";
import { IItemRepo } from "../../../domain/repositories/folder-item.repo";
import { CommandHandlerProvider } from "../command-bus/decorator";
import { ICommandHandlerProvider } from "../command-bus/interface";
import { Repository } from "../repository/token";

@CommandHandlerProvider
export class ItemCommandHandlerProvider implements ICommandHandlerProvider {
  constructor(@Inject(Repository.Item) private itemRepo: IItemRepo) {}

  getCommandHandlers(): ICommandHandler<ICommand, any>[] {
    const { itemRepo } = this;

    return [
      new PinItemHandler(itemRepo),
      new UnpinItemHandler(itemRepo),
      new MoveItemToTopHandler(itemRepo),
    ];
  }
}

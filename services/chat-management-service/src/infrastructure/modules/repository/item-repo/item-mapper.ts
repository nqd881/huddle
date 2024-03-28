import { Item } from "../../../../domain/models/item/item";
import { IMapper } from "../_interfaces/mapper";
import { ItemModel } from "./item-model";

export class ItemMapper implements IMapper<ItemModel, Item> {
  toDomain(persistenceModel: ItemModel): Item | null {
    return null;
  }

  toPersistence(domainModel: Item): ItemModel | null {
    return null;
  }
}

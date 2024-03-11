import { IRepository } from "ddd-node";
import { Item } from "../models/item/item";

export interface IItemRepo extends IRepository<Item> {}

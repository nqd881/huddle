import { ClsStore } from "nestjs-cls";
import { Transaction } from "sequelize";

export interface MyClsStore extends ClsStore {
  transaction?: Transaction;
}

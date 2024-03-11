import { AnyAggregate, AnyAggregateES, IRepository } from "ddd-node";

export interface IRepositoryBase<T extends AnyAggregate | AnyAggregateES>
  extends IRepository<T> {
  unitOfWork(): IUnitOfWork;
}

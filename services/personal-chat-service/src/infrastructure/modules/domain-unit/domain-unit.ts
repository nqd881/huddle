import { IMapper } from "../../interface/mapper";

export class DomainUnitIsNotLoadedError extends Error {
  constructor() {
    super("Domain unit is not loaded");
  }
}

export class DomainUnit<T = any, U = any> {
  readonly mapper: IMapper<T, U>;
  private _id: string;
  private _domainModel: T;
  private _persistenceModel: U;

  constructor(mapper: IMapper<T, U>) {
    this.mapper = mapper;
  }

  isLoaded(): this is LoadedDomainUnit<T, U> {
    return Boolean(this._id && this._domainModel);
  }

  checkIsLoaded() {
    if (!this.isLoaded()) throw new DomainUnitIsNotLoadedError();
  }

  loadDomainModel(id: string, domainModel: T) {
    if (this.isLoaded()) return this;

    this._id = id;

    this._domainModel = domainModel;

    return this;
  }

  loadPersistenceModel(
    id: string,
    persistenceModel: U
  ): LoadedDomainUnit<T, U> {
    if (this.isLoaded()) return this;

    this._id = id;

    this._persistenceModel = persistenceModel;

    this._domainModel = this.mapper.toDomain(this._persistenceModel);

    return this as any;
  }

  getId() {
    return this._id ?? null;
  }

  getDomainModel() {
    return this._domainModel ?? null;
  }

  getPersistenceModel() {
    return this._persistenceModel ?? null;
  }

  updatePersistenceModel(updateFn: PersistenceModelUpdater = () => {}) {
    this.checkIsLoaded();

    const newPersistenceModel = this.mapper.toPersistence(this._domainModel);

    if (this._persistenceModel) {
      updateFn(this._persistenceModel, newPersistenceModel);
    } else {
      this._persistenceModel = newPersistenceModel;

      updateFn(this._persistenceModel);
    }
  }
}

/* function that transform oldPersistenceModel to equal to newPersistenceMode */
export type PersistenceModelUpdater<U = any> = (
  oldPersistenceModel: U,
  newPersistenceModel?: U
) => any;

export type LoadedDomainUnit<T = any, U = any> = DomainUnit<T, U> & {
  getId(): string;
  getDomainModel(): U;
};

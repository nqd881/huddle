import { IMapper } from "../_interfaces/mapper";

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

  isLoaded() {
    return this._id && this._domainModel;
  }

  protected checkIsLoaded() {
    if (!this.isLoaded()) throw new DomainUnitIsNotLoadedError();
  }

  loadDomainModel(id: string, domainModel: T) {
    if (this.isLoaded()) return this;

    this._id = id;

    this._domainModel = domainModel;

    return this;
  }

  loadPersistenceModel(id: string, persistenceModel: U) {
    if (this.isLoaded()) return this;

    this._id = id;

    this._persistenceModel = persistenceModel;

    this._domainModel = this.mapper.toDomain(this._persistenceModel);

    return this;
  }

  getId() {
    this.checkIsLoaded();

    return this._id;
  }

  getDomainModel() {
    this.checkIsLoaded();

    return this._domainModel;
  }

  getPersistenceModel() {
    return this._persistenceModel ?? null;
  }

  // update persistence model
  // updateFn is function that transform oldPersistenceModel to equal to newPersistenceModel
  //
  updatePersistenceModel(
    updateFn: (
      oldPersistenceModel: U,
      newPersistenceModel?: U
    ) => any = () => {}
  ) {
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

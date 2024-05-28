export interface IMapper<DomainModel = any, PersistenceModel = any> {
  toDomain(model: PersistenceModel): DomainModel;
  toPersistence(model: DomainModel): PersistenceModel;
}

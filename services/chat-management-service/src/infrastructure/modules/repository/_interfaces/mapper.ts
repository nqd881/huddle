export interface IMapper<PersistenceModel = any, DomainModel = any> {
  toDomain(persistenceModel: PersistenceModel): DomainModel | null;
  toPersistence(domainModel: DomainModel): PersistenceModel | null;
}

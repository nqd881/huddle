export class AggregateWrapper<DM, PM> {
  id: string;
  domainModel: DM;
  persistenceModel: PM;

  static fromDomain() {}
}
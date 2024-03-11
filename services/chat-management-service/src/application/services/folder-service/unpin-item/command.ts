export class UnpinItemCommand {
  constructor(
    public readonly folderId: string,
    public readonly itemId: string
  ) {}
}

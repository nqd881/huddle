export class MovePinnedItemCommand {
  constructor(
    public readonly folderId: string,
    public readonly itemId: string,
    public readonly destPosition: number
  ) {}
}

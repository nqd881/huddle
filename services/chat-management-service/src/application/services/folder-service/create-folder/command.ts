export class CreateFolderCommand {
  constructor(
    public readonly userId: string,
    public readonly name: string,
    public readonly ids?: string[],
    public readonly tags?: string[],
    public readonly archived?: boolean
  ) {}
}

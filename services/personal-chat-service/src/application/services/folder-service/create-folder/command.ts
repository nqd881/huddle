export class CreateFolderCommand {
  constructor(public readonly userId: string, public readonly name: string) {}
}

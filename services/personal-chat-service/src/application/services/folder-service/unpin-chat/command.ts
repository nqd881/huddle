export class UnpinChatCommand {
  constructor(
    public readonly folderId: string,
    public readonly chatId: string
  ) {}
}

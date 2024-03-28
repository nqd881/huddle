export class CreatePersonalChatCommand {
  constructor(
    public readonly sourceChatId: string,
    public readonly ownerUserId: string,
    public readonly tags?: string[]
  ) {}
}

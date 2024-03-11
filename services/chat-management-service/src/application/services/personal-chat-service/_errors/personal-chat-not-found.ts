import { Id } from "ddd-node";

export class PersonalChatNotFoundError extends Error {
  constructor(personalChatId: Id) {
    super(`PersonalChat_${personalChatId.value} not found.`);
  }
}

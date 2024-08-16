import { AppCommand } from "../../../base";

export interface CreateUserCommandPayload {
  userId: string;
}

export class CreateUserCommand extends AppCommand<CreateUserCommandPayload> {}

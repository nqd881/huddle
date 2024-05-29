import { AppCommand } from "../../../base/app-command";

export type CreateFolderCommandPayload = {
  name: string;
};

export class CreateFolderCommand extends AppCommand<CreateFolderCommandPayload> {}

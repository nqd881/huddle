import { Folder } from "../../../../domain/models/folder/folder";
import { AppCommandBase } from "../../../base/app-command";

export type CreateFolderCommandPayload = {
  name: string;
};

export type CreateFolderCommandResult = Folder;

export class CreateFolderCommand extends AppCommandBase<CreateFolderCommandPayload> {}

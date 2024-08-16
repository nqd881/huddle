import { AppCommand } from "../../../base";
import { FiltersOptions } from "../../folder/common/parse-filters";

export interface CreateFolderCommandPayload {
  name: string;
  filter?: FiltersOptions;
}

export class CreateFolderCommand extends AppCommand<CreateFolderCommandPayload> {}

import { Event, EventBase } from "ddd-node";

export interface FolderFiltersUpdatedProps {}

@Event("FOLDER_FILTER_UPDATED")
export class FolderFiltersUpdated extends EventBase<FolderFiltersUpdatedProps> {}

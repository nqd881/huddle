import { Event, EventBase } from "ddd-node";

export interface FolderItemUnpinnedProps {}

@Event("FOLDER_ITEM_UNPINNED")
export class FolderItemUnpinned extends EventBase<FolderItemUnpinnedProps> {}

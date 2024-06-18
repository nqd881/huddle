import { Event, EventBase } from "ddd-node";

export interface FolderItemPinnedProps {}

@Event("FOLDER_ITEM_PINNED")
export class FolderItemPinned extends EventBase<FolderItemPinnedProps> {}

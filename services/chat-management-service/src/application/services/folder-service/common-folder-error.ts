import { Id } from "ddd-node";

export namespace CommonFolderError {
  export class FolderNotFound extends Error {
    constructor(folderId: Id) {
      super(`Folder_${folderId.value} not found`);
    }
  }
}

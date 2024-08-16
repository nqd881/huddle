import { Id } from "ddd-node";

export namespace FolderError {
  export class FolderNotFound extends Error {
    constructor(folderId: Id) {
      super(`Folder with id ${folderId} not found`);
    }
  }
}

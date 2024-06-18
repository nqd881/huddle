import { ValueObjectBase } from "ddd-node";
import { ChatDescriptor } from "../chat-descriptor";

export interface FolderFilterProps {}

export abstract class FolderFilter<
  P extends FolderFilterProps = FolderFilterProps
> extends ValueObjectBase<P> {
  abstract matchesFilter(chatDescriptor: ChatDescriptor): boolean;
}

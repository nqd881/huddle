import { ValueObjectBase } from "ddd-node";
import { ChatDescriptor } from "../../personal-chat/chat-descriptor";

export interface FolderFilterBaseProps {}

export abstract class FolderFilterBase<
  P extends FolderFilterBaseProps = FolderFilterBaseProps
> extends ValueObjectBase<P> {
  abstract matchesFilter(chatDescriptor: ChatDescriptor): boolean;
}

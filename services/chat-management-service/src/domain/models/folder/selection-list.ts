import { Entity, entity } from "ddd-node";
import { AnySelection } from "./selection";
import { PersonalChat } from "../personal-chat/personal-chat";

export interface SelectionListProps {
  selections: Map<string, AnySelection>;
}

@entity()
export class SelectionList extends Entity<SelectionListProps> {
  static fromArray(selections: AnySelection[] = []) {
    const selectionList = SelectionList.newEntity({ selections: new Map() });

    selections.forEach((selection) => selectionList.setSelection(selection));

    return selectionList;
  }

  getSelections() {
    return Array.from(this._props.selections.values());
  }

  setSelection(selection: AnySelection) {
    this._props.selections.set(selection.getType(), selection);
  }

  removeSelection(selectionType: string) {
    this._props.selections.delete(selectionType);
  }

  isPersonalChatSelected(personalChat: PersonalChat) {
    return this.getSelections().some((selection) =>
      selection.isPersonalChatSelected(personalChat)
    );
  }
}

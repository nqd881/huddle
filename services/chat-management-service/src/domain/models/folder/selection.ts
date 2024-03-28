import { Entity, entity } from "ddd-node";
import { ICriterion, CriterionType } from "./criterion";
import { PersonalChat } from "../personal-chat/personal-chat";

export interface SelectionProps {
  criteria: Map<CriterionType, ICriterion>;
}

@entity()
export class Selection extends Entity<SelectionProps> {
  static newSelection(criteria: ICriterion[] = []) {
    const selection = Selection.newEntity({ criteria: new Map() });

    criteria.forEach((criterion) => {
      selection.setCriterion(criterion);
    });

    return selection;
  }

  getCriteria() {
    return this._props.criteria;
  }

  getCriterion(criterionType: CriterionType) {
    return this.getCriteria().get(criterionType);
  }

  setCriterion(criterion: ICriterion) {
    this._props.criteria.set(criterion.getCriterionType(), criterion);
  }

  removeCriterion(criterionType: CriterionType) {
    this._props.criteria.delete(criterionType);
  }

  matchesAnyCriteria(personalChat: PersonalChat) {
    let matches = false;

    this.getCriteria().forEach((criterion) => {
      if (criterion.match(personalChat)) matches = true;
    });

    return matches;
  }
}

import { Entity, Id, entity } from "ddd-node";
import { Position } from "./position";

export interface PinnedItemProps {
  readonly itemId: Id;
  position: Position;
}

@entity()
export class PinnedItem extends Entity<PinnedItemProps> {
  get itemId() {
    return this._props.itemId;
  }

  get position() {
    return this._props.position;
  }

  moveUp(step: number) {
    if (step === 0) throw new Error();

    this._props.position = this.position.decrease(step);
  }

  moveDown(step: number) {
    if (step === 0) throw new Error();

    this._props.position = this.position.increase(step);
  }

  move(step: number) {
    if (step < 0) this.moveDown(step * -1);
    else if (step > 0) this.moveUp(step);
  }

  moveTo(position: Position) {
    this._props.position = position;
  }

  isPositionedAt(position: Position) {
    return this.position.isEqualsTo(position);
  }

  isHigherThanPosition(position: Position) {
    return this.position.isLessThan(position);
  }

  isLowerThanPosition(position: Position) {
    return this.position.isGreaterThan(position);
  }

  isHigherThan(other: PinnedItem) {
    return this.isHigherThanPosition(other.position);
  }

  isLowerThan(other: PinnedItem) {
    return this.isLowerThanPosition(other.position);
  }
}

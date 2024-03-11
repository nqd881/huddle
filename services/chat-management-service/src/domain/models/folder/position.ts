import { ValueObject, valueObject } from "ddd-node";

export interface PositionProps {
  value: number;
}

@valueObject()
export class Position extends ValueObject<PositionProps> {
  validate() {
    if (this.value < 0)
      throw new Error("The value of position must be a positive integer");
  }

  get value() {
    return this._props.value;
  }

  increase(value: number) {
    if (value < 0) throw new Error();

    return new Position({ value: this.value + value });
  }

  decrease(value: number) {
    if (value < 0) throw new Error();

    return new Position({ value: this.value - value });
  }

  isEqualsTo(other: Position) {
    return this.value === other.value;
  }

  isGreaterThan(other: Position) {
    return this.value > other.value;
  }

  isLessThan(other: Position) {
    return this.value < other.value;
  }
}

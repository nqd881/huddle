import { ValueObject, valueObject } from "ddd-node";

export interface TagProps {
  name: string;
  value: string;
}

@valueObject()
export class Tag extends ValueObject<TagProps> {
  get name() {
    return this._props.name;
  }

  get value() {
    return this._props.value;
  }
}

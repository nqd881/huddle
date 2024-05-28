import { Injectable } from "@nestjs/common";

@Injectable()
export class TestService {
  constructor() {}

  sum(...numbers: number[]) {
    return numbers.reduce((result, current) => result + current, 0);
  }
}

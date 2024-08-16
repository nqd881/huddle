import { Injectable } from "@nestjs/common";
import { StateAggregateBuilder } from "ddd-node";
import { User } from "../../../../domain/models/user/user";
import { UserStatusBuilder } from "../../../../domain/models/user/user-status";
import { IMapper } from "../../../interface/mapper";
import { UserModel } from "./models/user.model";

@Injectable()
export class UserMapper implements IMapper<User, UserModel> {
  toDomain(model: UserModel): User {
    const { id, status } = model;

    const builder = new StateAggregateBuilder(User);

    return builder
      .withProps({ status: UserStatusBuilder().withValue(status).build() })
      .withId(id)
      .build();
  }

  toPersistence(model: User): UserModel {
    const { status } = model;

    return UserModel.build({
      id: model.id(),
      status: String(status.value),
    });
  }
}

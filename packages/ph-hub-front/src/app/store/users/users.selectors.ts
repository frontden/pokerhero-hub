import { Selector } from '@ngxs/store';
import { UsersState } from './users.state';
import { UsersStateModel } from './users-state.model';
import { User } from '@ph-hub/common';

export class UsersSelectors {
  @Selector([UsersState])
  public static user(state: UsersStateModel): User {
    return state.user;
  }
}

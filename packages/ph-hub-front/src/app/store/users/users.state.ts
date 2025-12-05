import { UsersStateModel, defaults } from './users-state.model';
import { Injectable } from '@angular/core';
import { Action, State, StateContext } from '@ngxs/store';
import { LoadUsers } from './users.actions';
import { ApiService } from '../../services/api.service';
import { tap } from 'rxjs';

@State<UsersStateModel>({
  name: 'users',
  defaults,
})
@Injectable()
export class UsersState {
  constructor(private apiService: ApiService) {
  }

  @Action(LoadUsers)
  public loadUsers(
    {patchState}: StateContext<UsersStateModel>,
  ) {
    return this.apiService.getUsers().pipe(
      tap((users) => {
        if (users.length > 0) {
          patchState({
            user: users[0],
          });
        }
      })
    );
  }
}

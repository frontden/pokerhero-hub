import { UsersStateModel, defaults } from "./users-state.model";
import { Injectable } from "@angular/core";
import {Action, State, StateContext} from '@ngxs/store';
import { LoadUsers } from './users.actions';

@State<UsersStateModel>({
    name: 'users',
    defaults,
})
@Injectable()
export class UsersState {
    @Action(LoadUsers)
    public loadUsers(
        { patchState }: StateContext<UsersStateModel>,
    ): void {
        patchState({
            user: {
                email: 'test@gmail.com',
            },
        })
    }
}

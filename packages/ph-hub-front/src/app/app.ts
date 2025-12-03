import { Component, inject, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Store } from '@ngxs/store';
import { UserInterface } from '@ph-hub/common';
import { LoadUsers } from './store/users/users.actions';
import { Observable } from 'rxjs';
import { UsersSelectors } from './store/users/users.selectors';
import { AsyncPipe } from '@angular/common';

@Component({
	selector: 'ph-root',
	imports: [RouterOutlet, AsyncPipe],
	templateUrl: './app.html',
	styleUrl: './app.scss',
})
export class App implements OnInit {
	private store = inject(Store);
	user$: Observable<UserInterface> = inject(Store).select(UsersSelectors.user);

    ngOnInit() {
		this.store.dispatch(new LoadUsers());
    }
}

import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Store } from '@ngxs/store';
import { UserInterface } from '@ph-hub/common';
import { Observable } from 'rxjs';
import { UsersSelectors } from './store/users/users.selectors';
import { AsyncPipe } from '@angular/common';
import { CreateHero } from "./modules/hero-avatar/create-hero-container/create-hero.component";

@Component({
    selector: 'ph-root',
    imports: [RouterOutlet, AsyncPipe, CreateHero],
    templateUrl: './app.html',
    styleUrl: './app.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class App implements OnInit {
    private store = inject(Store);

    user$: Observable<UserInterface> = inject(Store).select(UsersSelectors.user);

    ngOnInit() {
    // this.store.dispatch(new LoadUsers());
    }
}

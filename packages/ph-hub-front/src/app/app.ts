import { ChangeDetectionStrategy, Component, HostListener, inject, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Store } from '@ngxs/store';
import { UserInterface } from '@ph-hub/common';
import { Observable } from 'rxjs';
import { UsersSelectors } from './store/users/users.selectors';
import { AsyncPipe } from '@angular/common';
import { AppService } from './services/app.service';

@Component({
    selector: 'ph-root',
    imports: [RouterOutlet],
    templateUrl: './app.html',
    styleUrl: './app.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class App implements OnInit {
    @HostListener('window:mouseup') onMouseUp() {
        this.appService.changeMouseDownState(false);
    }

    @HostListener('window:mousedown') onMouseDown() {
        this.appService.changeMouseDownState(true);
    }

    constructor(private appService: AppService) {
    }

    private store = inject(Store);

    user$: Observable<UserInterface> = inject(Store).select(UsersSelectors.user);

    ngOnInit() {
    // this.store.dispatch(new LoadUsers());
    }
}

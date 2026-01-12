import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { DEMO_FEATURE } from './demo.model';
import { Router, RouterOutlet } from '@angular/router';
import { Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { User } from '@ph-hub/common';
import { UsersSelectors } from '../../store/users/users.selectors';
import { LoadUsers } from '../../store/users/users.actions';
import { AsyncPipe } from '@angular/common';
import { AuthService } from '../../services/auth.service';
import { ButtonComponent } from '../../widgets/button/button.component';

@Component({
  selector: 'ph-demo',
  imports: [RouterOutlet, AsyncPipe, ButtonComponent],
  templateUrl: './demo.html',
  styleUrl: './demo.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Demo {
  features = DEMO_FEATURE;

  constructor(
    private readonly router: Router,
    private authService: AuthService,
  ) {}

  private store = inject(Store);

  changeFeature(feature: DEMO_FEATURE) {
    this.router.navigate(['/', 'demo', feature]);
  }

  user$: Observable<User> = inject(Store).select(UsersSelectors.user);

  ngOnInit() {
    this.store.dispatch(new LoadUsers());
  }

  logout() {
    this.authService.logout();
  }
}

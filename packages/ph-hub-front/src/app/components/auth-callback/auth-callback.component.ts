import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SpinnerIconComponent } from '../../modules/icons/components/spinner/spinner-icon.component';

@Component({
  selector: 'ph-auth-callback',
  standalone: true,
  imports: [SpinnerIconComponent],
  templateUrl: './auth-callback.component.html',
  styleUrls: ['./auth-callback.component.scss']
})
export class AuthCallbackComponent implements OnInit {
  error: string | null = null;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
  ) {}

  ngOnInit() {
    const params = this.route.snapshot.queryParams;

    const accessToken = params['accessToken'];
    const refreshToken = params['refreshToken'];
    const deviceFingerprint = params['deviceFingerprint'];

    if (accessToken && refreshToken) {
      try {
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        localStorage.removeItem('deviceFingerprint');

        localStorage.setItem('accessToken', accessToken);
        localStorage.setItem('refreshToken', refreshToken);

        if (deviceFingerprint) {
          localStorage.setItem('deviceFingerprint', deviceFingerprint);
        }

        const savedAccessToken = localStorage.getItem('accessToken');

        if (!savedAccessToken) {
          this.error = 'Failed to save tokens (localStorage blocked?)';
          return;
        }

        setTimeout(() => {
          this.router.navigate(['/']).then();
        }, 1000);
      } catch (err) {
        this.error = 'Failed to save authentication data';
      }
    } else {
      this.error = 'Authentication failed: No tokens received';

      setTimeout(() => {
        this.router.navigate(['/login']);
      }, 2000);
    }
  }
}
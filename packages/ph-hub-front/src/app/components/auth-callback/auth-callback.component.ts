import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SpinnerIconComponent } from '../../modules/icons/components/spinner/spinner-icon.component';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'ph-auth-callback',
  standalone: true,
  imports: [SpinnerIconComponent],
  templateUrl: './auth-callback.component.html',
  styleUrls: ['./auth-callback.component.scss']
})
export class AuthCallbackComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private http = inject(HttpClient);

  error: string | null = null;

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

        this.checkOnboardingStatus();

      } catch (err) {
        this.error = 'Failed to save authentication data';
      }
    } else {
      this.error = 'Authentication failed: No tokens received';

      setTimeout(() => {
        this.router.navigate(['/login']);
      }, 3000);
    }
  }

  private checkOnboardingStatus() {
    this.http.get<any>(`${environment.apiUrl}/auth/me`, {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
      }
    }).subscribe({
      next: (user) => {
        if (!user.onboardingCompleted) {
          setTimeout(() => {
            this.router.navigate(['/start']);
          }, 1000);
        } else {
          setTimeout(() => {
            this.router.navigate(['/']);
          }, 1000);
        }
      },
      error: () => {
        this.error = 'Failed to fetch user information';
        setTimeout(() => {
          this.router.navigate(['/login']);
        }, 3000);
      }
    });
  }
}
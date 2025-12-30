import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap, BehaviorSubject, shareReplay } from 'rxjs';
import { Router } from '@angular/router';
import { User } from '@ph-hub/common';

interface AuthResponse {
  accessToken: string;
  refreshToken: string;
  user: User;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private http = inject(HttpClient);
  private router = inject(Router);

  private readonly apiUrl = 'http://localhost:3000/auth';
  private currentUserSubject = new BehaviorSubject<User | null>(null);
  public currentUser$ = this.currentUserSubject.asObservable();

  private currentUserCache$: Observable<User> | null = null;

  constructor() {
    this.loadCurrentUser();
  }

  sendVerificationCode(email: string): Observable<{ message: string }> {
    return this.http.post<{ message: string }>(`${this.apiUrl}/send-code`, { email });
  }

  verifyCode(email: string, code: string): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.apiUrl}/verify-code`, { email, code })
      .pipe(tap(response => this.handleAuthSuccess(response)));
  }

  loginWithGoogle(): void {
    window.location.href = `${this.apiUrl}/google`;
  }

  refresh(): Observable<{ accessToken: string; refreshToken: string }> {
    const refreshToken = localStorage.getItem('refreshToken');
    return this.http.post<{ accessToken: string; refreshToken: string }>(
      `${this.apiUrl}/refresh`,
      { refreshToken }
    ).pipe(tap(response => {
      localStorage.setItem('accessToken', response.accessToken);
    }));
  }

  logout(): void {
    this.http.post(`${this.apiUrl}/logout`, {}).subscribe({
      next: () => this.handleLogout(),
      error: () => this.handleLogout()
    });
  }

  getCurrentUser(): Observable<User> {
    if (this.currentUserCache$) {
      return this.currentUserCache$;
    }

    this.currentUserCache$ = this.http.get<User>(`${this.apiUrl}/me`).pipe(
      tap(user => {
        this.currentUserSubject.next(user);
      }),
      shareReplay(1)
    );

    return this.currentUserCache$;
  }

  clearUserCache(): void {;
    this.currentUserCache$ = null;
  }

  private loadCurrentUser(): void {
    if (this.isAuthenticated()) {
      this.getCurrentUser().subscribe({
        error: () => this.handleLogout()
      });
    }
  }

  private handleAuthSuccess(response: AuthResponse): void {
    localStorage.setItem('accessToken', response.accessToken);
    localStorage.setItem('refreshToken', response.refreshToken);
    this.currentUserSubject.next(response.user);

    this.clearUserCache();

    this.redirectAfterLogin(response.user);
  }

  private handleLogout(): void {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('deviceFingerprint');
    this.currentUserSubject.next(null);

    this.clearUserCache();
    this.router.navigate(['/login']);
  }

  redirectAfterLogin(user: User): void {
    if (!user.onboardingCompleted) {
      this.router.navigate(['/start']);
    } else {
      this.router.navigate(['/']);
    }
  }

  isAuthenticated(): boolean {
    return !!localStorage.getItem('accessToken');
  }

  getAccessToken(): string | null {
    return localStorage.getItem('accessToken');
  }
}
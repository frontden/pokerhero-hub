import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap, BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';
import { UserInterface } from '@ph-hub/common';

interface AuthResponse {
  accessToken: string;
  refreshToken: string;
  user: UserInterface;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly apiUrl = 'http://localhost:3000/auth';
  private currentUserSubject = new BehaviorSubject<UserInterface | null>(null);
  public currentUser$ = this.currentUserSubject.asObservable();

  constructor(
    private http: HttpClient,
    private router: Router,
  ) {
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

  getCurrentUser(): Observable<UserInterface> {
    return this.http.get<UserInterface>(`${this.apiUrl}/me`)
      .pipe(tap(user => this.currentUserSubject.next(user)));
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
  }

  private handleLogout(): void {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('deviceFingerprint');
    this.currentUserSubject.next(null);
    this.router.navigate(['/login']);
  }

  isAuthenticated(): boolean {
    return !!localStorage.getItem('accessToken');
  }

  getAccessToken(): string | null {
    return localStorage.getItem('accessToken');
  }
}
import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { environment } from '../../environments/environment';
import { CreateUserPreferencesRequest } from '@ph-hub/common';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class UserApiService {
  private http = inject(HttpClient);
  private authService = inject(AuthService);
  private readonly apiUrl = environment.apiUrl || 'http://localhost:3000';

  completeOnboarding(data: CreateUserPreferencesRequest): Observable<void> {
    return this.http.post<void>(
      `${this.apiUrl}/users/complete-onboarding`,
      data
    ).pipe(
      tap(() => {
        this.authService.clearUserCache();
      })
    );
  }

  // updateProfile(data: Partial<CreateUserPreferencesRequest>): Observable<void> {
  //   return this.http.patch(`${this.apiUrl}/users/profile`, data);
  // }
}
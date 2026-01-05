import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { map } from 'rxjs';
import { AuthService } from '../services/auth.service';

export const onboardingGuard = () => {
  const authService = inject(AuthService);
  const router = inject(Router);

  return authService.getCurrentUser().pipe(
    map(user => {
      if (!user.onboardingCompleted) {
        router.navigate(['/start']);
        return false;
      }
      return true;
    })
  );
};
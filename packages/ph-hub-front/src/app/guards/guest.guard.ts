import { inject } from '@angular/core';
import { Router } from '@angular/router';

export const guestGuard = () => {
  const router = inject(Router);

  const accessToken = localStorage.getItem('accessToken');

  if (accessToken) {
    router.navigate(['/']);
    return false;
  }

  return true;
};
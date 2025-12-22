import { inject } from '@angular/core';
import { Router } from '@angular/router';

export const authGuard = () => {
  const router = inject(Router);

  const accessToken = localStorage.getItem('accessToken');

  if (accessToken) {
    return true;
  }

  router.navigate(['/login']);
  return false;
};
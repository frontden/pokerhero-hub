import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { FingerprintService } from '../services/fingerprint.service';
import { from, switchMap } from 'rxjs';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const fingerprintService = inject(FingerprintService);

  const accessToken = localStorage.getItem('accessToken');
  let headers: { [key: string]: string } = {};

  if (accessToken) {
    headers['Authorization'] = `Bearer ${accessToken}`;
  }

  const needsFingerprint =
    req.url.includes('/auth/verify-code') ||
    req.url.includes('/auth/refresh') ||
    req.url.includes('/auth/impersonate');

  if (needsFingerprint) {
    const savedFingerprint = localStorage.getItem('deviceFingerprint');

    if (savedFingerprint) {
      headers['X-Device-Fingerprint'] = savedFingerprint;

      const authReq = req.clone({ setHeaders: headers });
      return next(authReq);
    }

    return from(fingerprintService.getFingerprint()).pipe(
      switchMap(fingerprint => {
        headers['X-Device-Fingerprint'] = fingerprint;
        const authReq = req.clone({ setHeaders: headers });
        return next(authReq);
      })
    );
  }

  const authReq = req.clone({ setHeaders: headers });
  return next(authReq);
};
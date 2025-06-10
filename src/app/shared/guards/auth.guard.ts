import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { MessageService } from 'primeng/api';

export const authGuard: CanActivateFn = (route, state) => {
  const token = sessionStorage.getItem('token');
  const router = inject(Router);
  const messageService = inject(MessageService);

  if (!token) {
    messageService.add({
      severity: 'warn',
      summary: 'Unauthorized',
      detail: 'Please login to access this page.'
    });
    return router.parseUrl('/auth/login');
  }

  const allowedRoles = route.data?.['roles'] as string[];
  const currentRole = sessionStorage.getItem('role');

  if (allowedRoles && !allowedRoles.includes(currentRole!)) {
    messageService.add({
      severity: 'error',
      summary: 'Access Denied',
      detail: 'You do not have permission to view this page.'
    });
    return router.parseUrl('/auth/login');
  }

  return true;
};
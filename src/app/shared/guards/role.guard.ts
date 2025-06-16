import { CanActivateFn, Router } from '@angular/router';
import { TokenService } from '../services/token.service';
import { inject } from '@angular/core';

export const roleGuard: CanActivateFn = (route, state) => {
  const tokenService = inject(TokenService);
  const router = inject(Router);

  const token = tokenService.getValidToken();

  if (!token) {
    return true;
  }

  const decoded = tokenService.decodeToken(token);
  const currentRole = decoded ? tokenService.extractRole(decoded) : null;

  if (!currentRole) {
    tokenService.clearAuthData();
    return router.parseUrl('/auth/login');
  }

  const urlParts = state.url.split('/');
  const isDashboardRoute = urlParts[1] === 'dashboard';
  const requestedRole = isDashboardRoute ? urlParts[2] : null;

  if (isDashboardRoute) {
    if (requestedRole && requestedRole !== currentRole) {
      return router.parseUrl(`/dashboard/${currentRole}/home`);
    }
    return true;
  }

  return true;
};
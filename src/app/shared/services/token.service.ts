import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { jwtDecode, JwtPayload } from 'jwt-decode';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';

interface CustomJwtPayload extends JwtPayload {
  'http://schemas.microsoft.com/ws/2008/06/identity/claims/role'?: string;
  role?: string; // Fallback for standard role claim
}

@Injectable({
  providedIn: 'root'
})
export class TokenService {
  private jwtHelper = new JwtHelperService();

  constructor(
    private router: Router,
    private messageService: MessageService
  ) { }

  // Store token after successful login
  setToken(token: string): void {
    sessionStorage.setItem('token', token);
    const decoded = this.decodeToken(token);
    if (decoded) {
      const role = this.extractRole(decoded);
      if (role) {
        sessionStorage.setItem('role', role);
      }
    }
  }

  // Extract role from token with support for both claim types
  private extractRole(decoded: CustomJwtPayload): string | null {
    // Try Microsoft claims URI first
    if (decoded['http://schemas.microsoft.com/ws/2008/06/identity/claims/role']) {
      return this.normalizeRole(decoded['http://schemas.microsoft.com/ws/2008/06/identity/claims/role']);
    }
    // Fallback to standard role claim
    if (decoded.role) {
      return this.normalizeRole(decoded.role);
    }
    return null;
  }

  // Normalize role names to match your application's convention
  private normalizeRole(role: string): string {
    return role.toLocaleLowerCase();
  }

  // Clear all auth data
  clearAuthData(): void {
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('role');
    sessionStorage.removeItem('userId');
    sessionStorage.removeItem('email');
  }

  // Decode token with proper typing
  decodeToken(token: string): CustomJwtPayload | null {
    try {
      return jwtDecode<CustomJwtPayload>(token);
    } catch (error) {
      console.error('Error decoding token:', error);
      return null;
    }
  }

  // Get valid token from storage
  getValidToken(): string | null {
    const token = sessionStorage.getItem('token');
    return token && this.isTokenValid(token) ? token : null;
  }

  // Token validation
  isTokenValid(token: string): boolean {
    if (!token) return false;

    try {
      return !this.jwtHelper.isTokenExpired(token);
    } catch (error) {
      console.error('Token validation error:', error);
      return false;
    }
  }

  // Get user role with validation
  getUserRole(): string | null {
    const token = this.getValidToken();
    if (!token) return null;

    // First try to get from sessionStorage (already normalized)
    const storedRole = sessionStorage.getItem('role');
    if (storedRole) return storedRole;

    // Fallback to decoding token
    const decoded = this.decodeToken(token);
    return decoded ? this.extractRole(decoded) : null;
  }

  // Handle invalid token scenario
  handleInvalidToken(): void {
    this.clearAuthData();
    this.messageService.add({
      severity: 'error',
      summary: 'Session Expired',
      detail: 'Please login again to continue',
      life: 3000
    });
    this.router.navigate(['/auth/login']);
  }
}
import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { jwtDecode, JwtPayload } from 'jwt-decode';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { ILoginResponse } from 'src/app/data/models/authentication/loginResponse';

interface CustomJwtPayload extends JwtPayload {
  'http://schemas.microsoft.com/ws/2008/06/identity/claims/role'?: string;
  role?: string;
  userId?: string;
  email?: string;
  // Add any other custom claims your token might have
}

@Injectable({
  providedIn: 'root'
})

export class TokenService {
  private jwtHelper = new JwtHelperService();

  constructor(private router: Router, private messageService: MessageService) { }

  processLoginResponse(loginResponse: ILoginResponse): boolean {
    if (!loginResponse?.data?.token) {
      this.messageService.add({
        severity: 'error',
        summary: 'Login Failed',
        detail: 'Invalid login response',
        life: 3000
      });
      return false;
    }

    const token = loginResponse.data.token;
    const decoded = this.decodeToken(token);

    if (!decoded || !this.isTokenValid(token)) {
      this.messageService.add({
        severity: 'error',
        summary: 'Login Failed',
        detail: 'Invalid or expired token',
        life: 3000
      });
      return false;
    }

    // Store token and user data
    this.setToken(token);
    this.storeUserData(loginResponse.data.user);

    // Redirect based on role
    const role = this.extractRole(decoded);
    if (role) {
      this.redirectToDashboard(role);
    }

    return true;
  }


  setToken(token: string): void {
    sessionStorage.setItem('token', token);
    const decoded = this.decodeToken(token);
    if (decoded) {
      const role = this.extractRole(decoded);
      if (role) {
        sessionStorage.setItem('role', role);
      }
      if (decoded.userId) {
        sessionStorage.setItem('userId', decoded.userId);
      }
    }
  }

  /**
   * Stores additional user data from login response
   * @param user User data from login response
   */
  private storeUserData(user: ILoginResponse['data']['user']): void {
    sessionStorage.setItem('userId', user.id);
    sessionStorage.setItem('email', user.email);
    sessionStorage.setItem('firstName', user.firstName);
    sessionStorage.setItem('lastName', user.lastName);
    if (user.profileImageUrl) {
      sessionStorage.setItem('profileImageUrl', user.profileImageUrl);
    }
  }

  /**
   * Gets role from stored token
   * @returns string | null - role if available
   */
  getRole(): string | null {
    // First check session storage
    const storedRole = sessionStorage.getItem('role');
    if (storedRole) return storedRole;

    // Fallback to token decoding
    const token = this.getValidToken();
    if (!token) return null;

    const decoded = this.decodeToken(token);
    return decoded ? this.extractRole(decoded) : null;
  }

  /**
   * Gets userId from stored token
   * @returns string | null - userId if available
   */
  getUserId(): string | null {
    // First check session storage
    const storedUserId = sessionStorage.getItem('userId');
    if (storedUserId) return storedUserId;

    // Fallback to token decoding
    const token = this.getValidToken();
    if (!token) return null;

    const decoded = this.decodeToken(token);
    return decoded?.userId || null;
  }

  private redirectToDashboard(role: string): void {
    switch (role.toLowerCase()) {
      case 'administrator':
        this.router.navigate(['/dashboard/administrator/home']);
        break;
      case 'librarian':
        this.router.navigate(['/dashboard/librarian/home']);
        break;
      case 'student':
        this.router.navigate(['/dashboard/student/home']);
        break;
      default:
        this.router.navigate(['/auth/login']);
        break;
    }
  }

  decodeToken(token: string): CustomJwtPayload | null {
    try {
      return jwtDecode<CustomJwtPayload>(token);
    } catch (error) {
      console.error('Error decoding token:', error);
      return null;
    }
  }

  isTokenValid(token: string): boolean {
    if (!token) return false;

    try {
      return !this.jwtHelper.isTokenExpired(token);
    } catch (error) {
      console.error('Token validation error:', error);
      return false;
    }
  }

  getValidToken(): string | null {
    const token = sessionStorage.getItem('token');
    return token && this.isTokenValid(token) ? token : null;
  }

  public extractRole(decoded: CustomJwtPayload): string | null {
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

  clearAuthData(): void {
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('role');
    sessionStorage.removeItem('userId');
    sessionStorage.removeItem('email');
    sessionStorage.removeItem('firstName');
    sessionStorage.removeItem('lastName');
    sessionStorage.removeItem('profileImageUrl');
  }
}
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Route, Router } from '@angular/router';

import { AuthService } from '../service/auth.service';
import { MessageService } from 'primeng/api';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {

  constructor(private router: Router, private messageService: MessageService, private authService: AuthService) { }

  canActivate(next: ActivatedRouteSnapshot): boolean {

    return true
  }

  canActivateChild(next: ActivatedRouteSnapshot): boolean {

    return true
  }

  canLoad(route: Route): boolean {

    return true
  }
  //TODO - depend on that function for chaining validators
  private chainValidator(data: any): boolean {

    const isValidToken: boolean = this.tokenValidator();

    return isValidToken;
  }

  private tokenValidator(): boolean {

    const authenticationToken = this.authService.getAuthenticationToken();

    if (!authenticationToken) {

      this.authService.logout();

      return false;
    }

    if (this.authService.tokenExpired()) {

      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: 'Your session expired. Please sign in again.',
      });

      this.authService.logout();

      return false;
    }

    return true;
  }

}

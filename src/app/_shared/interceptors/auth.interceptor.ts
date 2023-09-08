import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, switchMap, throwError } from 'rxjs';
import { AuthService, STORAGE_REFRESH_TOKEN, STORAGE_TOKEN_EXPIRES_IN } from '../service/auth.service';


@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private authService: AuthService) {

  }
  private isRefreshing = false;

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    const authenticationToken = this.authService.getAuthenticationToken();

    this.addTokenHeader(request);
    if (authenticationToken) {

      if (this.authService.tokenExpired()) {

        if (!this.isRefreshing) this.refreshToken(next, request);
      }
    }

    return next.handle(request);
  }

  private addTokenHeader(request: HttpRequest<any>) {

    const authenticationToken = this.authService.getAuthenticationToken();
    return request.clone({
      setHeaders: {
        'Accept': 'application/json',
        'Authorization': `${authenticationToken}`
      }
    })
  }

  refreshToken(next: HttpHandler, request: HttpRequest<any>) {

    this.isRefreshing = true;
    this.authService.refreshMyToken().subscribe({

      next: (res: any) => {
        this.isRefreshing = false;

        this.authService.setAuthenticationToken(res.data.accessToken.secret);
        localStorage.setItem(STORAGE_REFRESH_TOKEN, JSON.stringify(res.data.refreshToken));
        localStorage.setItem(STORAGE_TOKEN_EXPIRES_IN, JSON.stringify(res.data.accessToken.expiresAt));

        return next.handle(this.addTokenHeader(request));
      },
      error: (err) => {

        this.isRefreshing = false;
        this.authService.logout();
        return throwError(err);
      }
    })
  }
}

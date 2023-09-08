import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { AuthService } from '../service/auth.service';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

  constructor(private authService: AuthService) { }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {

    return next.handle(request).pipe(

      catchError((error: HttpErrorResponse) => {

        let errorMsg = '';
        const errorCode = error.error?.messageCode;

        switch (errorCode) {

          case '401':
            errorMsg = 'You are not authorized';
            this.authService.logout();
            break;

          case '403':
            errorMsg = 'Forbidden';
            break;

          case '404':
            errorMsg = 'Not Found';
            break;

          case '500':
            errorMsg = 'Internal server error';
            break;

          case '400':
            errorMsg = 'Bad request';
            break;

          case '422':
            errorMsg = 'Unprocessable Entity';
            break;

          case '429':
            errorMsg = 'Too Many Requests';
            break;

          default:
            errorMsg = 'Something went wrong. Please try again later.';
        }
        return throwError(errorMsg);
      })
    )
  }
}

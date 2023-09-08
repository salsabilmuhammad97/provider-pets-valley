import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { UserLoginRequest, UserLoginResponse, UserRegisterRequest } from '../interfaces/user';
import { Otp } from '../interfaces/otp.service';
import { Router } from '@angular/router';

export const STORAGE_KEY_TOKEN = 'userToken';
export const STORAGE_KEY_USER_ID = 'userId';
export const COOKIE_KEY_EMAIL = 'email';
export const COOKIE_KEY_PASSWORD = 'password';
export const RECAPTCHA_SITE_KEY = "6LeEy7onAAAAALUT79XMpliDgUorFekbHsQF-Dyx"
export const ENCRYPT_SECRET_KEY = "secret*&^key#@!"
export const STORAGE_REFRESH_TOKEN = "refreshToken"
export const STORAGE_TOKEN_EXPIRES_IN = "tokenExpiresIn"

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient, private router: Router) { }

  public register(obj: UserRegisterRequest): Observable<any> {

    return this.http.post(environment.apiUrl + 'api/Auth/RegisterProvider', obj);
  }

  public login(data: UserLoginRequest): Observable<UserLoginResponse> {

    return this.http.post<UserLoginResponse>(environment.apiUrl + `api/Auth/ProviderSignIn`, data);
  }

  public otpVerify(data: Otp): Observable<any> {

    return this.http.post<any>(environment.apiUrl + `api/Auth/VerifyOTP`, data);
  }

  public resendOtp(data: Otp): Observable<any> {

    return this.http.post<any>(environment.apiUrl + `api/Auth/ResendOtp`, data);
  }

  tokenExpired() {

    const expiresAt = JSON.parse(localStorage.getItem(STORAGE_TOKEN_EXPIRES_IN) || '');
    return new Date() >= new Date(expiresAt);
  }

  getAuthenticationToken = () => localStorage.getItem(STORAGE_KEY_TOKEN);

  setAuthenticationToken = (token: string) => localStorage.setItem(STORAGE_KEY_TOKEN, token);

  logout() {

    console.log('logout');

    localStorage.removeItem(STORAGE_KEY_TOKEN);
    localStorage.removeItem(STORAGE_KEY_USER_ID);
    localStorage.removeItem(STORAGE_REFRESH_TOKEN);
    localStorage.removeItem(STORAGE_TOKEN_EXPIRES_IN);
    this.router.navigate(['/']);
  }

  refreshMyToken() {

    const refreshToken = JSON.parse(localStorage.getItem(STORAGE_REFRESH_TOKEN) || '');
    return this.http.post<any>(environment.apiUrl + `api/Auth/RefreshMyToken`, {
      accessToken: this.getAuthenticationToken(),
      refreshToken: {
        id: refreshToken.id,
        secret: refreshToken.refreshSecret
      }
    });
  }

}

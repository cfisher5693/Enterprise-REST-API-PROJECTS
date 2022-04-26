import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { UserCreds } from './user-creds';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  accessToken!: string;
  loginUrl: string;
  public redirectUrl!: string;
  tokenRequestUrl = '/api/Login';

  constructor(private http: HttpClient) {
    this.loginUrl = ``
  }

  setToken(token: string) {
    this.accessToken = token;
  }

  getToken(): string {
    return this.accessToken;
  }

  setRedirectUrl(url: string) {
    localStorage.setItem('redirectUrl', url);
  }

  getRedirectUrl(): string {
    return localStorage.getItem('redirectUrl') as string;
  }

  //requestAccessToken(code: string): Observable<TokenResponse> {
  //  return this.http.post<TokenResponse>(this.tokenRequestUrl, { "code": code });
  //}

  createUser(userCreds: UserCreds) {
    console.log(userCreds)
    return this.http.post(this.tokenRequestUrl + '/create', userCreds)
      .pipe(catchError(this.handleError));
  }

  login(userCreds: UserCreds) {
    return this.http.post(this.tokenRequestUrl + '/login', userCreds)
      .pipe(catchError(this.handleError));
  }

  private handleError(error: HttpErrorResponse) {
    if (error.status === 0) {
      console.error('An error occurred: ', error.error);
    } else {
      console.error(`Backend returned code ${error.status}, body was: `, error.error);
      if (error.status === 404) {
        return throwError("Search found no results!");
      }
    }
    return throwError('Nothing entered!');
  }
}

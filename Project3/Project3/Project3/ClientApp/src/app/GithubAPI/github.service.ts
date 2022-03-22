import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { UserList } from './user-list';
import { catchError } from "rxjs/operators";
import { RepoList } from './repo-list';
import { User } from './user';
import { Repo } from './repo';

@Injectable({
  providedIn: 'root'
})
export class GithubService {
  private baseURL: string = "https://api.github.com";
  constructor(private httpClient: HttpClient) { }

  searchForUsers(name: string): Observable<UserList> {
    return this.httpClient
      .get<UserList>(`${this.baseURL}/search/users?q=${name}&page=1&per_page=10`)
      .pipe(catchError(this.handleError));

  }

  searchForRepositories(name: string): Observable<RepoList> {
    return this.httpClient
      .get<RepoList>(`${this.baseURL}/search/repositories?q=${name}&page=1&per_page=10`)
      .pipe(catchError(this.handleError));
  }

  getUser(name: string): Observable<User> {
    return this.httpClient
      .get<User>(`${this.baseURL}/users/${name}`)
      .pipe(catchError(this.handleError));
  }

  getRepo(name: string): Observable<Repo> {
    return this.httpClient
      .get<Repo>(`${this.baseURL}/repos/${name}`)
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

import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TodoCustom } from './todo-custom';
import { catchError } from "rxjs/operators";
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TodoManagementService {

  private baseUrl = '/api/todo';
  constructor(private http: HttpClient) { }

  get() {
    return this.http.get<TodoCustom[]>(this.baseUrl)
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

import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TodoCustom } from './todo-custom';
import { catchError, map } from "rxjs/operators";
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TodoManagementService {

  private baseUrl = '/api/Item';
  constructor(private http: HttpClient) { }

  get() {
    return this.http.get<TodoCustom[]>(this.baseUrl)
      .pipe(
        map<TodoCustom[], TodoCustom[]>(items => {
          items.forEach(item => {
            item.dueDate = new Date(item.dueDate);
          });
          return items
        }),
        catchError(this.handleError));
  }

  save(item: TodoCustom) {
    return this.http.post(this.baseUrl, item)
      .pipe(catchError(this.handleError));
  }

  update(item: TodoCustom) {
    return this.http.put(this.baseUrl, item)
      .pipe(catchError(this.handleError));
  }

  remove(id: number) {
    const newPath = this.baseUrl + '/' + id
    return this.http.delete(newPath)
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

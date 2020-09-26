import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

import { tap, catchError } from 'rxjs/operators';
import { Todo } from '../todo/todo.model';

@Injectable()
export class ApiService {
  constructor(private httpClient: HttpClient) {}

  getTodos(): Observable<Todo[]> {
    return this.httpClient.get<Todo[]>(environment.baseUrl+"todos");
  }

  addToDo(todo: Todo):Observable<Todo> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Token',
      }),
    };
    return this.httpClient.post<Todo>(environment.baseUrl+"todos", todo, httpOptions).pipe(
      tap((data) => {
        console.log(JSON.stringify(data));
      }),
    );
  }


  updateTodo(todo: Todo): Observable<Todo> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Token',
      }),
    };
    return this.httpClient.put<Todo>(environment.baseUrl+"todos/"+todo.id, todo, httpOptions)

  }

  deleteTodo(todo:Todo):Observable<{}>{
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Token',
      }),
    };
    return this.httpClient.delete(environment.baseUrl+"todos/"+todo.id, httpOptions)

  }

}
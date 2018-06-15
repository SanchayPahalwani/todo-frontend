import { Injectable } from '@angular/core';
import { Todo } from "./todo";
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TodoDataService {

  lastId = 0;

  todos: Todo[] = [];

  private baseUrl: string = "http://localhost:8000/api/task/";
  
  constructor(private httpClient: HttpClient) { }

  addTodo(todo: Todo): Observable<Todo> {
    return this.httpClient.post<Todo>(this.baseUrl, todo);
  }

  deleteTodoById(id: number): Observable<any> {
    return this.httpClient.delete(this.baseUrl + id + "/");
  }

  getAllTodos(): Observable<any> {
    return this.httpClient.get(this.baseUrl);
  }

  toggleTodoComplete(todo: Todo) {
    return this.httpClient.patch(this.baseUrl + todo.id + "/", {
      "complete": !todo.complete
    });
  }
}

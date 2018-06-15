import { Component } from '@angular/core';

import { Observable, Subject } from 'rxjs';

import { Todo } from "./todos/todo";
import { TodoDataService } from "./todos/todo-data.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [TodoDataService]
})
export class AppComponent {
  title = 'ToDo';

  dropdown: boolean = false;
  newTodo: Todo = new Todo();
  todos: Todo[];
  tasks: Todo[];
  filterBy: any;
  today: Date;
  month: any;

  todos$: Observable<Todo[]>;
  private searchTerms = new Subject<string>();

  constructor(private todoDataService: TodoDataService) {
    this.todoDataService
      .getAllTodos()
      .subscribe(todosResponse => {
        this.todos = todosResponse.objects;
        this.tasks = this.todos.filter(todo => todo.parent == null);
        this.todos.sort( function(task1, task2) {
          if ( task1.due_date < task2.due_date ){
            return -1;
          }else if( task1.due_date > task2.due_date ){
              return 1;
          }else{
            return 0;	
          }
        });
        this.today = new Date();
        this.month = this.pad2(this.today.getMonth() + 1);
      });
  }

  pad2(number) {
    return (number < 10 ? '0' : '') + number;        
  }

  toggleDropdown() {
    this.dropdown = !this.dropdown;
    this.newTodo.parent = null;
  }

  addTodo() {
    this.todoDataService.addTodo(this.newTodo)
      .subscribe(todo => {
        this.todos.push(todo);
      });
  }

  toggleTodoComplete(todo) {
    this.todoDataService.toggleTodoComplete(todo)
      .subscribe(res => {
        todo.complete = !todo.complete;
      });
  }

  removeTodo(todo) {
    this.todoDataService.deleteTodoById(todo.id)
      .subscribe(emptyRes => {
        this.todos = this.todos
          .filter(t => t.id !== todo.id);
      }); 
  }

  ngOnInit(){

  }

}
import { Component, OnInit } from '@angular/core';
import { combineLatest, Observable } from 'rxjs';

import { TodoService } from 'src/app/services/todo.service';
import { FilterEnum } from 'src/app/services/types/filter-enum.enum';
import { TodoInterface } from 'src/app/services/types/todo-interface';
import { map } from 'rxjs/operators'

@Component({
  selector: 'app-todos-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  visibleTodos$: Observable<TodoInterface[]>;
  noTodoClass$: Observable<boolean>
  isAllTodosSelected$ : Observable<boolean>

  constructor(private todosService: TodoService) { 
    this.todosService.todos$.pipe(
      map((todos) => todos.every((todo) => todo.isCompleted))
    )
    this.noTodoClass$ = this.todosService.todos$.pipe(
      map((todos) => todos.length === 0)
    );
    this.visibleTodos$ = combineLatest(
      this.todosService.todos$,
      this.todosService.filter$
    ).pipe(
      map(([todos, filter]: [TodoInterface[], FilterEnum]) =>{
        if(filter === FilterEnum.active){
          return todos.filter((todo) => !todo.isCompleted);
        }
        else if(filter === FilterEnum.completed){
          return todos.filter((todo) => todo.isCompleted)
        }
        return todos;
      })
    );
  }

  toggleAllTodos(event: Event){
    const target = event.target as HTMLInputElement
    this.todosService.toggleAll(target.checked)
  }

  ngOnInit(): void {
  }

}

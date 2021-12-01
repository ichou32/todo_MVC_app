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

  constructor(private todosService: TodoService) { 
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

  ngOnInit(): void {
  }

}

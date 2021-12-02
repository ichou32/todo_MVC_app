import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { FilterEnum } from './types/filter-enum.enum';
import { TodoInterface } from './types/todo-interface';

@Injectable({
  providedIn: 'root'
})
export class TodoService {

  constructor() { }

  todos$ = new BehaviorSubject<TodoInterface[]>([])
  filter$ = new BehaviorSubject<FilterEnum>(FilterEnum.all)

  addTodo(text: string){
    const newTodo: TodoInterface = {
      text,
      isCompleted: false,
      id: Math.random().toString(16),
    };
    const updateTodos = [...this.todos$.getValue(), newTodo]
    this.todos$.next(updateTodos);

  }

  toggleAll(isCompleted: boolean): void {
    const updatedTodos = this.todos$.getValue().map((todo)=> {
      return {
        ...todo,
        isCompleted,
      };
    });
    this.todos$.next(updatedTodos)
  }
}

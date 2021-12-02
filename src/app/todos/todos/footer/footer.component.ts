import { Component, OnInit } from '@angular/core';
import {map} from 'rxjs/operators';
import { Observable} from 'rxjs';
import { TodoService } from 'src/app/services/todo.service';
import { FilterEnum } from 'src/app/services/types/filter-enum.enum';

@Component({
  selector: 'app-todos-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {

  noTodosClass$ : Observable<boolean>
  activeCount$: Observable<Number>
  itemsLeftText$ : Observable<string>
  filter$ : Observable<FilterEnum>
  filterEnum = FilterEnum

  constructor(private todosService: TodoService) {
    this.activeCount$ = this.todosService.todos$.pipe(
      map((todos) => todos.filter((todo) => !todo.isCompleted).length)
    )
    this.itemsLeftText$ = this.activeCount$.pipe(
      map((activeCount) => `item${activeCount !== 1 ? 's': ''}`)
    )
    this.noTodosClass$ = this.todosService.todos$.pipe(
      map((todos) => todos.length === 0)
    );
   }

  ngOnInit(): void {
  }

  changeFilter(event: Event, filterName: FilterEnum): void{
    event.preventDefault()
    this.todosService.changeFilter(filterName)
  }

}

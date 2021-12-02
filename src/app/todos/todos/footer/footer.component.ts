import { Component, OnInit } from '@angular/core';
import {map} from 'rxjs/operators';
import { Observable} from 'rxjs';
import { TodoService } from 'src/app/services/todo.service';

@Component({
  selector: 'app-todos-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {

  noTodosClass$ : Observable<boolean>
  constructor(private todosService: TodoService) {
    this.noTodosClass$ = this.todosService.todos$.pipe(
      map((todos) => todos.length === 0)
    );
   }

  ngOnInit(): void {
  }

}

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TodosComponent } from './todos/todos.component';
import { Router, RouterModule, Routes } from '@angular/router';
import { HeaderComponent } from './todos/header/header.component';
import { MainComponent } from './todos/main/main.component';
import { TodoService } from '../services/todo.service';
import { TodoComponent } from './todos/todo/todo.component';
const routes: Routes = [
    {
      path: '',
      component: TodosComponent
    }
]

@NgModule({
  declarations: [
    TodosComponent, 
    HeaderComponent, 
    MainComponent, TodoComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  providers: [TodoService]
})
export class TodosModule { }

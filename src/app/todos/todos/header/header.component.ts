import { Component, Input, OnInit } from '@angular/core';
import { TodoService } from 'src/app/services/todo.service';

@Component({
  selector: 'app-todos-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
 
  text: string=''
  list: any=[]
  constructor(private todoService: TodoService) { 
    this.todoService.todos$.subscribe((todos) =>{
      console.log(todos);
    })
  }

  ngOnInit(): void {
  }
    
  changeText(event: Event){
    const target= event.target as HTMLInputElement
    this.text = target.value
  }
  addtodo():void {
    this.todoService.addTodo(this.text)
    this.text=''

  }

}

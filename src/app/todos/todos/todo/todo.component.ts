import { Component, Input, OnInit, Output, EventEmitter, ViewChild, ElementRef, OnChanges, SimpleChanges} from '@angular/core';
import { TodoService } from 'src/app/services/todo.service';
import { TodoInterface } from 'src/app/services/types/todo-interface';

@Component({
  selector: 'app-todos-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css']
})
export class TodoComponent implements OnInit, OnChanges {

  @Input('todo') todoProps: TodoInterface
  @Input('isEditing') isEditingProps: boolean
  @Output('setEditingId') setEditingIdEvent: EventEmitter<string | null> = new EventEmitter();
  editingText:  string =''
  @ViewChild('textInput') textInput : ElementRef
  
  constructor(private todosService: TodoService) { }

  ngOnInit(): void {
    this.editingText = this.todoProps.text
  }

  ngOnChanges(changes: SimpleChanges) {
    console.log('changes', changes)
    if(changes.isEditingProps.currentValue){
      setTimeout(() =>{
        this.textInput.nativeElement.focus()
      }, 0)
    }
  }
   
  serTodoInEditMode(): void {
    this.setEditingIdEvent.emit(this.todoProps.id);
  }

  removeTodo(): void{
    this.todosService.removeTodo(this.todoProps.id)
    console.log('remove Todo');
  }

  toggleTodo(): void{
    this.todosService.toggleTodo(this.todoProps.id)
    console.log('toggle todo')
  }

  changeText(event: Event): void {
    const value = (event.target as HTMLInputElement).value
    this.editingText = value
    console.log('change text')
  }

  changeTodo(){
    this.todosService.changeTodo(this.todoProps.id, this.editingText)
    this.setEditingIdEvent.emit(null)
    console.log('change todo')
  }

}

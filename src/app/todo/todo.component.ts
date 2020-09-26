import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../services/api.service';
import { Todo } from './todo.model';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css']
})
export class TodoComponent implements OnInit {


  todos:Todo[]=[]
  todo:Todo = new Todo();
  description = new FormControl('',Validators.required);


  onSubmit(){
    this.todo.description=this.description.value,
    this.todo.isComplete=true

    this.apiServis.addToDo(this.todo).subscribe();
    this.getTodos()

    
    //this.todos.push(this.todo)
  }

  isComplete(todo:Todo){
    this.todos.find(data=>data.id==todo.id).isComplete = (!todo.isComplete)

    this.apiServis.updateTodo(todo).subscribe(data=>{
      
      this.getTodos()
    });
  }

  deleteTodo(todo:Todo){
    this.apiServis.deleteTodo(todo).subscribe(data=>{
      console.log("burda"+JSON.stringify(data))
      this.getTodos()
    })
  }








  constructor(private apiServis:ApiService) { }

  ngOnInit(): void {
    this.getTodos()
  }


  getTodos(){
    this.apiServis.getTodos().subscribe(data=>{
      this.todos=data
      //this.todos.push({id:4,description:"dasd",isComplete:false})
      console.log(this.todos)
    })
  }

  isClass(status:boolean){
    if(status) {
      return "checked"
    }
    return "checked"
  }

}

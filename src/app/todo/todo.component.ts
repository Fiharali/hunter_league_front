import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-todo',
  imports: [FormsModule],
  templateUrl: './todo.component.html',
  styleUrl: './todo.component.css',
})
export class TodoComponent {
  isEdit = false;

  todoForUpdate: { id: number; text: string; date: string } | undefined;

  todos = [
    {
      id: 1,
      text: 'Learn Angular',
      date: '2021-10-01',
    },
    {
      id: 2,
      text: 'Learn React',
      date: '2021-10-02',
    },
    {
      id: 3,
      text: 'Learn Vue',
      date: '2021-10-03',
    },
  ];

  newTodo = {
    id: this.todos.length + 1,
    text: '',
    date: '',
  };

  addTodo() {
    this.newTodo.id = this.todos.length + 1;
    this.todos.push(this.newTodo);

    this.newTodo = {
      id: this.todos.length + 1,
      text: '',
      date: '',
    };
  }

  editTodo(id: number) {
    this.isEdit = true;
    this.todoForUpdate = this.todos.find((todo) => todo.id === id);
    if (this.todoForUpdate) {
      this.newTodo = this.todoForUpdate;
    }
  }

  updateTodo(){
    
  }
}

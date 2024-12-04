import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-todo',
  imports: [FormsModule],
  templateUrl: './todo.component.html',
  styleUrl: './todo.component.css'
})
export class TodoComponent {




isEdit = false;
showToasteVar = false;
showToastMessage = "";
showToastMessageColor = "";



  todos = [
    {
      id: 1,
      text: "Learn Angular",
      date: "2021-10-01",
    },
    {
      id: 2,
      text: "Learn React",
      date: "2021-10-02",
    },
    {
      id: 3,
      text: "Learn Vue",
      date: "2021-10-03",
    },

  ]

  newTodo = {
    id: this.todos.length + 1,
    text: "",
    date: "",
  }


  addTodo() {

    if (this.validateDate()) {
this.newTodo.id = this.todos.length + 1;
    this.todos.push(this.newTodo);

    this.newTodo = {
      id: this.todos.length + 1,
      text: "",
      date: "",
    }

    this.showToaste("Todo Added Successfully", "  alert-info");
  }
}


   todoForUpdate = 0
  editTodo(id : number) {
    this.isEdit = true;
    this.todoForUpdate = id;
    let todo = this.todos.find(todo => todo.id === id);
    if (todo) {
      this.newTodo = todo;
    }
  }

  updateTodo() {

    let todo = this.todos.find(todo => todo.id === this.todoForUpdate);

    if (todo) {
      todo.text = this.newTodo.text;
      todo.date = this.newTodo.date;
    }

    this.newTodo = {
      id: this.todos.length + 1,
      text: "",
      date: "",
    }

    this.isEdit = false;

  }
    deleteTodo( id : number) {
      Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!"
      }).then((result) => {
        if (result.isConfirmed) {
          this.todos = this.todos.filter(todo => todo.id !== id);
        }
      });

  }


  showToaste( messge :string , color:string) {

    this.showToastMessage = messge;
    this.showToastMessageColor = color;
    this.showToasteVar = true;

    setTimeout(() => {
      this.showToasteVar = false;
    }, 4000);



  }

  validateDate() {

    let isValid = true;
    if (this.newTodo.date === "") {
      isValid = false;
      this.showToaste("Please Enter Date", "alert-warning");
      return ;
    }

    if (this.newTodo.text === "") {
      isValid = false;
      this.showToaste("Please Enter Text", "alert-warning");
      return ;
    }

    if (this.newTodo.text != "" &&this.newTodo.text.length < 3) {
      isValid = false;
      this.showToaste(" please enter more than 3 chars", "alert-warning");
      return ;
    }

    if (this.newTodo.date != "" && this.newTodo.date > new Date().toISOString().split('T')[0]) {
      isValid = false;
      this.showToaste("Please Enter Text", "alert-warning");
      return ;
    }
    return isValid;
  }
}

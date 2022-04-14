import { Component, OnInit } from '@angular/core';
import { TodoCustom } from './todo-custom';
import { TodoManagementService } from './todo-management.service';

@Component({
  selector: 'app-todo-management',
  templateUrl: './todo-management.component.html',
  styleUrls: ['./todo-management.component.css']
})
export class TodoManagementComponent implements OnInit {
  public items!: TodoCustom[];
  constructor(private todoService: TodoManagementService) { }

  ngOnInit(): void {
    this.get();
  }

  get() {
    this.todoService.get().subscribe((items) => {
      this.items = items;
    })
  }

}

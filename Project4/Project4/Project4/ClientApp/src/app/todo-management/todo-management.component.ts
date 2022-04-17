import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TodoChangeComponent } from '../todo-change/todo-change.component';
import { TodoEditComponent } from '../todo-edit/todo-edit.component';
import { TodoSettingsComponent } from '../todo-settings/todo-settings.component';
import { TodoCustom } from './todo-custom';
import { TodoManagementService } from './todo-management.service';

@Component({
  selector: 'app-todo-management',
  templateUrl: './todo-management.component.html',
  styleUrls: ['./todo-management.component.css']
})
export class TodoManagementComponent implements OnInit {
  public items!: TodoCustom[];
  static itemToChange: TodoCustom;
  static warningOffset = 2;
  constructor(private todoService: TodoManagementService, private modalService: NgbModal) { }

  ngOnInit(): void {
    this.get();
  }

  get() {
    this.todoService.get().subscribe((items) => {
      this.items = items;
    })
  }

  add() {
    this.modalService.open(TodoEditComponent).result.then(() => {
      this.get();
    });
  }

  edit(item: TodoCustom) {
    TodoManagementComponent.itemToChange = item;
    this.modalService.open(TodoChangeComponent).result.then(() => {
      this.get();
    });
  }

  delete(id: number) {
    this.todoService.remove(id);
    this.get();
  }

  complete(item: TodoCustom) {
    item.completed = 1;
    this.todoService.update(item)
  }

  settings() {
    this.modalService.open(TodoSettingsComponent).result.then(() => {
      this.get();
    });
  }

  isPastDate(date: Date): boolean {
    var currentDate = new Date();
    if (currentDate > date) {
      return true;
    } else {
      return false;
    }
  }

  isAlmostDue(date: Date): boolean {
    var currentDate = new Date();
    if (currentDate.getDay() > date.getDay() - TodoManagementComponent.warningOffset) {
      return true;
    } else {
      return false;
    }
  }
}

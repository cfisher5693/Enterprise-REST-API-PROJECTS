import { Component, OnInit } from '@angular/core';
import { NgbActiveModal, NgbDateStruct, NgbTimeStruct } from '@ng-bootstrap/ng-bootstrap';
import { TodoCustom } from '../todo-management/todo-custom';
import { TodoManagementComponent } from '../todo-management/todo-management.component';
import { TodoManagementService } from '../todo-management/todo-management.service';

@Component({
  selector: 'app-todo-change',
  templateUrl: './todo-change.component.html',
  styleUrls: ['./todo-change.component.css']
})
export class TodoChangeComponent implements OnInit {
  dueDate!: NgbDateStruct;
  dueTime!: NgbTimeStruct;
  item!: TodoCustom;

  constructor(public activeModal: NgbActiveModal, private mgmtService: TodoManagementService) {

  }


  ngOnInit() {
    this.item = TodoManagementComponent.itemToChange;
    this.item.completed = 0;
    this.item.owner = "";
    this.dueTime = { hour: 12, minute: 30, second: 0 };
  }

  save() {
    const dueDate = new Date(this.dueDate.year, this.dueDate.month - 1, this.dueDate.day, this.dueTime.hour, this.dueTime.minute, 0, 0);
    this.item.dueDate = dueDate;
    this.mgmtService.update(this.item).subscribe(
      () => {
        this.activeModal.close();
      }
    )
  }
}

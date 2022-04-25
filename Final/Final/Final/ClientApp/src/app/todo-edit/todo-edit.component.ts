import { Component, OnInit } from '@angular/core';
import { NgbActiveModal, NgbDateStruct, NgbTimeStruct } from '@ng-bootstrap/ng-bootstrap';
import { TodoCustom } from '../todo-management/todo-custom';
import { TodoManagementService } from '../todo-management/todo-management.service';

@Component({
  selector: 'app-todo-edit',
  templateUrl: './todo-edit.component.html',
  styleUrls: ['./todo-edit.component.css']
})
export class TodoEditComponent implements OnInit {

  dueDate!: NgbDateStruct;
  dueTime!: NgbTimeStruct;
  item!: TodoCustom;

  constructor(public activeModal: NgbActiveModal, private mgmtService: TodoManagementService) {

  }


  ngOnInit() {
    this.item = new TodoCustom();
    this.item.completed = 0;
    this.item.owner = "";
    this.dueTime = { hour: 12, minute: 30, second: 0 };
  }

  save() {
    const dueDate = new Date(this.dueDate.year, this.dueDate.month - 1, this.dueDate.day, this.dueTime.hour, this.dueTime.minute, 0, 0);
    this.item.dueDate = dueDate;
    this.mgmtService.save(this.item).subscribe(
      () => {
        this.activeModal.close();
      }
    )
  }

}

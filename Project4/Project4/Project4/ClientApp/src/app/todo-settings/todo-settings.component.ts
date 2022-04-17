import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { TodoManagementComponent } from '../todo-management/todo-management.component';

@Component({
  selector: 'app-todo-settings',
  templateUrl: './todo-settings.component.html',
  styleUrls: ['./todo-settings.component.css']
})
export class TodoSettingsComponent implements OnInit {
  offset!: number;
  constructor(public activeModal: NgbActiveModal) { }

  ngOnInit(): void {

  }

  save() {
    TodoManagementComponent.warningOffset = this.offset;
    this.activeModal.close();
  }
}

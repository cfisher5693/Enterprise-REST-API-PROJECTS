import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TodoChangeComponent } from './todo-change.component';

describe('TodoChangeComponent', () => {
  let component: TodoChangeComponent;
  let fixture: ComponentFixture<TodoChangeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TodoChangeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TodoChangeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

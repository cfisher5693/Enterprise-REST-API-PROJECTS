import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TodoSettingsComponent } from './todo-settings.component';

describe('TodoSettingsComponent', () => {
  let component: TodoSettingsComponent;
  let fixture: ComponentFixture<TodoSettingsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TodoSettingsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TodoSettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

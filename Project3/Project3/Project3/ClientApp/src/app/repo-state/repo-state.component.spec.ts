import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RepoStateComponent } from './repo-state.component';

describe('RepoStateComponent', () => {
  let component: RepoStateComponent;
  let fixture: ComponentFixture<RepoStateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RepoStateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RepoStateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

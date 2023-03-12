import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClassroomOwnerWorkComponent } from './classroom-owner-work.component';

describe('ClassroomOwnerWorkComponent', () => {
  let component: ClassroomOwnerWorkComponent;
  let fixture: ComponentFixture<ClassroomOwnerWorkComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClassroomOwnerWorkComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ClassroomOwnerWorkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

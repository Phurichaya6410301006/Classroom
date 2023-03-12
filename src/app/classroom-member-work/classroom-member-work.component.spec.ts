import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClassroomMemberWorkComponent } from './classroom-member-work.component';

describe('ClassroomMemberWorkComponent', () => {
  let component: ClassroomMemberWorkComponent;
  let fixture: ComponentFixture<ClassroomMemberWorkComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClassroomMemberWorkComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ClassroomMemberWorkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});


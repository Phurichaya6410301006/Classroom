import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClassroomMemberComponent } from './classroom-member.component';

describe('ClassroomMemberComponent', () => {
  let component: ClassroomMemberComponent;
  let fixture: ComponentFixture<ClassroomMemberComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClassroomMemberComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ClassroomMemberComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});


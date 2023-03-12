import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClassroomOwnerComponent } from './classroom-owner.component';

describe('ClassroomOwnerComponent', () => {
  let component: ClassroomOwnerComponent;
  let fixture: ComponentFixture<ClassroomOwnerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClassroomOwnerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ClassroomOwnerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

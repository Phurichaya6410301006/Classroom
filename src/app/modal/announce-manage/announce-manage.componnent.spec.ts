import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnnounceManageComponent } from './announce-manage.component';

describe('AnnounceManageComponent', () => {
  let component: AnnounceManageComponent;
  let fixture: ComponentFixture<AnnounceManageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AnnounceManageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AnnounceManageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

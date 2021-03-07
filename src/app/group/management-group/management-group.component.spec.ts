import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagementGroupComponent } from './management-group.component';

describe('ManagementGroupComponent', () => {
  let component: ManagementGroupComponent;
  let fixture: ComponentFixture<ManagementGroupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManagementGroupComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ManagementGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

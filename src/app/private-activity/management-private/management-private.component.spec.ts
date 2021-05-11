import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagementPrivateComponent } from './management-private.component';

describe('ManagementPrivateComponent', () => {
  let component: ManagementPrivateComponent;
  let fixture: ComponentFixture<ManagementPrivateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManagementPrivateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ManagementPrivateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

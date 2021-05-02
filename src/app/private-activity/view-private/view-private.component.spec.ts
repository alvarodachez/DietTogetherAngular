import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewPrivateComponent } from './view-private.component';

describe('ViewPrivateComponent', () => {
  let component: ViewPrivateComponent;
  let fixture: ComponentFixture<ViewPrivateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewPrivateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewPrivateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

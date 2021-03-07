import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AthleteDataRegisterComponent } from './athlete-data-register.component';

describe('AthleteDataRegisterComponent', () => {
  let component: AthleteDataRegisterComponent;
  let fixture: ComponentFixture<AthleteDataRegisterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AthleteDataRegisterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AthleteDataRegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
